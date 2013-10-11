(function ( $ ) {

  // A list of all available craigslist.com categories.
  var $categories = {
    "ccc": {
      "name": "Community",
      "allow_all": true,
      "children": {
        "act": {
          "name": "Activity Partners"
        },
        "ats": {
          "name": "Artists"
        },
        "kid": {
          "name": "Childcare"
        },
        "com": {
          "name": "General Community"
        },
        "groups": {
          "name": "Groups"
        },
        "pet": {
          "name": "Pets"
        },
        "eve": {
          "name": "Events"
        },
        "laf": {
          "name": "Lost &amp; Found"
        },
        "muc": {
          "name": "Musicians"
        },
        "vnn": {
          "name": "Local News &amp; Views"
        },
        "pol": {
          "name": "Politics"
        },
        "rid": {
          "name": "Rideshare"
        },
        "vol": {
          "name": "Volunteers"
        },
        "cls": {
          "name": "Classes"
        }
      }
    },
    "hhh": {
      "name": "Housing",
      "allow_all": true,
      "children": {
        "apa": {
          "name": "Apartment &amp; Housing for Rent"
        }
      }
    }
  },
  $locations = {
    "tx": {
      "name": "Texas",
      "allow_all": false,
      "children": {
        "austin": {
          "name": "Austin"
        }
      }
    }
  },
  $apiURL,
  methods = {};

  // Returns a JSON array of available categories.
  methods.getCategories = function() {
    return JSON.stringify( $categories );
  };

  // Returns a JSON array of available locations.
  methods.getLocations = function() {
    return JSON.stringify( $locations );
  };

  // Builds a select element with specified data.
  methods.buildSelect = function( $ary, $attr ) {
    var select = $( "<select />" );
    select.attr( $attr );

    // Loop through array
    $.each( $ary, function( i, d ) {
      var option;

      // Check if should be optgroup
      if ( typeof d.children === "object" ) {
        option = $( "<optgroup />" );
        option.attr( "label", d.name );

        // Check if allow selection of parent category.
        if ( d.allow_all ) {
          option.append( $( "<option />" ).attr( "value", i ).html( "All " + d.name ) );
        }

        $.each( d.children, function( i2, d2 ) {
          option.append( $( "<option />" ).attr( "value", i2 ).html( d2.name ) );
        });

      } else {
        option = $( "<option />" );
        option.attr( "value", i ).html( d.name );
      }

      select.append(option);
    });

    return select;
  };

  // Get the latest listing
  methods.getLatest = function ( location, category, callback ) {
    $.post( $apiURL, { action: "getLatest", location: location, category: category }, function( d ) {
      callback( d );
    });
  };

  // API calls
  $.craigsAPI = function ( method, options, callback ) {
    var ret;

    switch ( method ) {
    case "getCategories":
      ret = methods.getCategories();
      break;
    case "getLocations":
      ret = methods.getLocations();
      break;
    case "buildSelect":
      ret = methods.buildSelect( $.parseJSON( options.ary ), options.attr );
      break;
    case "getLatest":
      methods.getLatest( options.location, options.category, function( d ) {
        callback( d );
      });
      ret = false;
      break;
    case "apiURL":
      $apiURL = options;
      ret = false;
      break;
    }

    if ( ret ) {
      return ret;
    }
  };

}( jQuery ));