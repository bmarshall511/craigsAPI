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
        "id": "category"
      }
    } ),
    locationSelect = $.craigsAPI( "buildSelect", {
      ary: $locations,
      attr: {
        "id": "location"
      }
    } ),
    interval;

  function setup( c ) {
    $.craigsAPI( "apiURL", "demo.php" );

    if ( typeof localStorage.getItem( "location" ) === "string" ) {
      locationSelect.val( localStorage.getItem( "location" ) );
    }

    if ( typeof localStorage.getItem( "category" ) === "string" ) {
      categorySelect.val( localStorage.getItem( "category" ) );
    }

    $( "#category-select" ).html( categorySelect );
    $( "#location-select" ).html( locationSelect );

    c();
  }

  function replaceAll( find, replace, str ) {
    return str.replace( new RegExp( find, "g" ), replace );
  }

  function addListing( listing ) {console.log(listing);
    var listings = $( "#listings" ),
      html,
      thumbnail,
      title,
      description,
      social;

    thumbnail = $( "<div />" ).addClass( "thumbnail" );
    title = $( "<h3 />" )
      .addClass( "title" )
      .html( $( "<a />" )
      .attr( "href", "[LINK]" )
      .html( "---TITLE---" )  );
    description = $( "<p />" ).addClass( "description" ).html( "---DESCRIPTION---" );
    html = $( "<article />" ).addClass( "listing" ).attr( "id", "---LISTINGID---" );

    social = "<a href='#' onclick=\"javascript: popup( 'https://twitter.com/intent/tweet?text=---TITLE--- ---LINK--- %23classifieds %23craigslist' )\" class='icon-twitter-sign social'></a>";
    social += "<a href='#' onclick=\"javascript: popup( 'https://www.facebook.com/sharer/sharer.php?u=---LINK---' )\" class='icon-facebook-sign social'></a>";
    social += "<a href='#' onclick=\"javascript: popup( 'https://plus.google.com/share?url=---LINK---' )\" class='icon-google-plus-sign social'></a>";

    html.append( thumbnail );
    html.append( title );
    html.append( description );
    html.append( social );

    if ( !$( "#listing-" + listing.listingID, listings ).length ) {
      html.attr( "id", "listing-" + listing.listingID );

      html.html( replaceAll( "---TITLE---", listing.title, html.html() ) );
      html.html( replaceAll( "---DESCRIPTION---", listing.description, html.html() ) );
      html.html( replaceAll( "---LISTINGID---", listing.listingID, html.html() ) );
      html.html( replaceAll( "---LINK---", encodeURIComponent(listing.link), html.html() ) );

      if ( $.isArray( listing.imgList ) && listing.imgList.length > 0 && listing.imgList[0] ) {
        $( ".thumbnail", html ).css({
          "background-image": "url(" + listing.imgList[0] + ")"
        });
      }

      listings.prepend( html );
    }
  }

  function crawl() {
    var category = $( "#category" ).val(),
      location = $( "#location" ).val();

    $.craigsAPI( "getLatest", {
      category: category,
      location: location,
    }, function( listing ) {
      addListing( $.parseJSON( listing ) );
    });

    localStorage.setItem( "location", location );
    localStorage.setItem( "category", category );
  }

  setup( function() {
    crawl();
    interval = setInterval( function() {
      crawl();
    }, 3000 );
  });

  $( "#category, #location" ).bind( "change", function() {
    crawl();
  });

  $( ".toggle-settings" ).bind( "click", function( e ) {
    e.preventDefault();
    var nav = $( ".nav" );
    if ( nav.css( "bottom" ) === "0px" ) {
      $( ".nav" ).css({
        bottom: "-6rem"
      });
    } else {
      $( ".nav" ).css({
        bottom: 0
      });
    }
  });

});