function popup( url ) {
  window.open( url, "popup", "width=626, height=436" );
  return false;
}

$(function() {
   var $categories = $.craigsAPI( "getCategories" ),
    $locations = $.craigsAPI( "getLocations" ),
    categorySelect = $.craigsAPI( "buildSelect", {
      ary: $categories,
      attr: {
        "id": "category",
        "multiple": "multiple"
      }
    } ),
    locationSelect = $.craigsAPI( "buildSelect", {
      ary: $locations,
      attr: {
        "id": "location",
        "multiple": "multiple"
      }
    } ),
    interval,
    snd = new Audio( "notification.mp3" );

  function setup( c ) {
    $.craigsAPI( "apiURL", "demo.php" );

    if ( typeof localStorage.getItem( "location" ) === "string" ) {
      locationSelect.val( $.parseJSON( localStorage.getItem( "location" ) ) );
    }

    if ( typeof localStorage.getItem( "category" ) === "string" ) {
      categorySelect.val( $.parseJSON( localStorage.getItem( "category" ) ) );
    }

    if ( typeof localStorage.getItem( "crawltype" ) === "string" ) {
      $( "#crawl-type" ).val( localStorage.getItem( "crawltype" ) );
    }

    $( "#category-select" ).html( categorySelect );
    $( "#location-select" ).html( locationSelect );

    c();
  }

  function replaceAll( find, replace, str ) {
    return str.replace( new RegExp( find, "g" ), replace );
  }

  function addListing( listing ) {
    var listings = $( "#listings" ),
      html,
      thumbnail,
      title,
      meta,
      description,
      social,
      favorite;

    favorites = $( "<a />" ).addClass("favorite icon-star");
    thumbnail = $( "<div />" ).addClass( "thumbnail" );
    title = $( "<h3 />" )
      .addClass( "title" )
      .html( $( "<a />" )
      .attr({
        "href": "---LINK---",
        "target": "_blank"
      })
      .html( "---TITLE---" )  );
    description = $( "<p />" ).addClass( "description" ).html( "---DESCRIPTION---" );
    html = $( "<article />" ).addClass( "listing" ).attr( "id", "---LISTINGID---" );

    meta = $( "<div />" ).addClass( "meta" );
    meta.html( "---LOCATION---" );

    social = "<div class='thumbnails'></div>";
    social += "<a href='#' onclick=\"javascript: popup( 'https://twitter.com/intent/tweet?text=---TITLE--- ---LINK--- %23classifieds %23craigslist' )\" class='icon-twitter-sign social'></a>";
    social += "<a href='#' onclick=\"javascript: popup( 'https://www.facebook.com/sharer/sharer.php?u=---LINK---' )\" class='icon-facebook-sign social'></a>";
    social += "<a href='#' onclick=\"javascript: popup( 'https://plus.google.com/share?url=---LINK---' )\" class='icon-google-plus-sign social'></a>";
    social += "<div class='clr'></div>";

    html.append( favorites );
    html.append( thumbnail );
    html.append( title );
    html.append( meta );
    html.append( description );
    html.append( social );

    if ( !$( "#listing-" + listing.listingID, listings ).length ) {
      html.attr( "id", "listing-" + listing.listingID );

      html.html( replaceAll( "---TITLE---", listing.title, html.html() ) );
      html.html( replaceAll( "---LOCATION---", listing.location, html.html() ) );
      html.html( replaceAll( "---DESCRIPTION---", listing.description, html.html() ) );
      html.html( replaceAll( "---LISTINGID---", listing.listingID, html.html() ) );
      html.html( replaceAll( "---LINK---", listing.link, html.html() ) );

      if ( $.isArray( listing.imgList ) && listing.imgList.length > 0 && listing.imgList[0] ) {
        $( ".thumbnail", html ).css({
          "background-image": "url(" + listing.imgList[0] + ")"
        });

        $.each( listing.imgList, function(k, v) {
          $( ".thumbnails ", html).append( $( "<div />" ).addClass( "sm-thumbnail" ).css({
            "background-image": "url(" + v + ")"
          }));
        });
      }

      listings.prepend( html );

      snd.play();
    }
  }

  function crawl( category, location ) {
    if ( !category ) {
      category = $( "#category" ).val();
    }

    if ( !location ) {
      location = $( "#location" ).val();
    }

    if ( $.isArray( location ) && $.isArray( category ) && location.length && category.length ) {
      $.each( location, function( i, l ) {
        $.each( category, function( i2, c ) {
          $.craigsAPI( "getLatest", {
            category: c,
            location: l,
          }, function( listing ) {
            addListing( $.parseJSON( listing ) );
          });
        });
      });
    }
  }

  function crawlCategory( cat ) {
    var cnt = 0;

    if ( !cat ) {
      cat = $( "#category" ).val();
    }  

    if ( $.isArray( cat ) && cat.length ) {
      $.each( cat, function( index, value ) {
        $.each( $.parseJSON( $locations ), function( i, d ) {
          if ( typeof d.children === "object" ) {
            $.each( d.children, function( i2, d2 ) {
              cnt++;
              window.setTimeout( function() {
                crawl( [value] , [i2] );
              }, $( "#crawl-rate" ).val() * cnt);
            });
          } else {
            cnt++;
            window.setTimeout( function() {
              crawl( [value] , [i] );
            }, $( "#crawl-rate" ).val() * cnt);
          }
        });
      });
    }
  }

  function crawlLocation( loc ) {
    var cnt = 0;

    if ( !loc ) {
      loc = $( "#location" ).val();
    }  

    if ( $.isArray( loc ) && loc.length ) {
      $.each( loc, function( index, value ) {
        $.each( $.parseJSON( $categories ), function( i, d ) {
          if ( typeof d.children === "object" ) {
            $.each( d.children, function( i2, d2 ) {
              cnt++;
              window.setTimeout( function() {
                crawl( [i2], [value] );
              }, $( "#crawl-rate" ).val() * cnt);
            });
          } else {
            cnt++;
            window.setTimeout( function() {
              crawl( [i], [value] );
            }, $( "#crawl-rate" ).val() * cnt);
          }
        });
      });
    }
  }

  function crawlAll() {
    var cnt = 0;

    $.each( $.parseJSON( $locations ), function( i, d ) {
      if ( typeof d.children === "object" ) {
        $.each( d.children, function( i2, d2 ) {
          $.each( $.parseJSON( $categories ), function( ic, dc ) {
            if ( typeof dc.children === "object" ) {
              $.each( dc.children, function( ic2, dc2 ) {
                cnt++;
                window.setTimeout( function() {
                  crawl( ic2 , i2 );
                }, $( "#crawl-rate" ).val() * cnt);
              });
            } else {
              cnt++;
              window.setTimeout( function() {
                crawl( ic , i2 );
              }, $( "#crawl-rate" ).val() * cnt);
            }
          });
        });

      } else {
        $.each( $.parseJSON( $categories ), function( ic, dc ) {
          crawl( ic , i2 );
        });
      }
    });
  }

  function doCrawl() {
    var type = $( "#crawl-type" );
    switch ( type.val() ) {
    case "normal":
      crawl();
      break;
    case "everything":
      crawlAll();
      break;
    case "category":
      crawlCategory();
      break;
    case "location":
      crawlLocation();
      break;
    }
  }

  function stopCrawl() {
    var id = window.setTimeout( function() {}, 0 );

    while ( id-- ) {
      window.clearTimeout( id );
    }
    window.clearInterval( interval );
  }

  function startCrawl() {
    var type = $( "#crawl-type" );

    localStorage.setItem( "crawltype", type.val() );
    localStorage.setItem( "location", JSON.stringify( $( "#location" ).val() ) );
    localStorage.setItem( "category", JSON.stringify( $( "#category" ).val() ) );

    interval = window.setInterval( function() {
      doCrawl();
    }, $( "#crawl-rate" ).val() * 4 );
  }

  setup( function() {
    doCrawl();

    startCrawl();
  });

  $( "#crawl-rate" ).bind( "change", function() {
    stopCrawl();
    doCrawl();
    startCrawl();
  });

  $( "#crawl-type" ).bind( "change", function() { 
    if ( $( this ).val() === "category" ) {
      $( "#location" ).attr( "disabled", true );
      $( "#category" ).attr( "disabled", false );
    } else if ( $( this ).val() === "normal" ) {
      $( "#location" ).attr( "disabled", false );
      $( "#category" ).attr( "disabled", false );
    } else if ( $( this ).val() === "everything" ) {
      $( "#location" ).attr( "disabled", true );
      $( "#category" ).attr( "disabled", true );
    } else if ( $( this ).val() === "location" ) {
      $( "#location" ).attr( "disabled", false );
      $( "#category" ).attr( "disabled", true );
    }

    stopCrawl();
    doCrawl();
    startCrawl();
  });

  $( "#category, #location" ).bind( "change", function() {
    stopCrawl();
    doCrawl();
    startCrawl();
  });

  $( ".toggle-settings" ).bind( "click", function( e ) {
    e.preventDefault();
    var nav = $( ".nav" );
    if ( nav.css( "bottom" ) === "0px" ) {
      $( ".nav" ).css({
        bottom: "-27rem"
      });
    } else {
      $( ".nav" ).css({
        bottom: 0
      });
    }
  });

});