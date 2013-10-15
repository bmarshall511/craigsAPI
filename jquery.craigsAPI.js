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
    "ppp": {
      "name": "Personals",
      "allow_all": true,
      "children": {
        "stp": {
          "name": "Strictly Platonic"
        },
        "w4w": {
          "name": "Women Seeking Women"
        },
        "w4m": {
          "name": "Women Seeking Men"
        },
        "m4w": {
          "name": "Men Seeking Women"
        },
        "m4m": {
          "name": "Men Seeking Men"
        },
        "msr": {
          "name": "Miscellaneous Romance"
        },
        "cas": {
          "name": "Casual Encounters"
        },
        "mis": {
          "name": "Missed Connections"
        },
        "rnr": {
          "name": "Rants &amp; Raves"
        }
      }
    },
    "hhh": {
      "name": "Housing",
      "allow_all": true,
      "children": {
        "apa": {
          "name": "Apartment &amp; Housing for Rent"
        },
        "roo": {
          "name": "Rooms &amp; Shares"
        },
        "sub": {
          "name": "Sublets &amp; Temporary Housing"
        },
        "hsw": {
          "name": "Housing Wanted"
        },
        "swp": {
          "name": "Housing Swap"
        },
        "vac": {
          "name": "Vacation Rentals"
        },
        "prk": {
          "name": "Parking &amp; Storage"
        },
        "off": {
          "name": "Office &amp; Commercial"
        },
        "rea": {
          "name": "Real Estate"
        },
        "sga": {
          "name": "Sporting Goods"
        },
        "tia": {
          "name": "Tickets"
        },
        "tla": {
          "name": "Tools"
        },
        "waa": {
          "name": "Wanted"
        },
        "ppa": {
          "name": "Appliances"
        },
        "ara": {
          "name": "Arts &amp; Crafts"
        },
        "sna": {
          "name": "ATVs, UTVs, Snowmobiles"
        },
        "pta": {
          "name": "Auto Parts"
        }
      }
    },
    "sss": {
      "name": "For Sale / Wanted",
      "allow_all": true,
      "children": {
        "ata": {
          "name": "Antiques"
        },
        "baa": {
          "name": "Baby &amp; Kid Stuff"
        },
        "bar": {
          "name": "Barter"
        },
        "bia": {
          "name": "Bicycles"
        },
        "boats": {
          "name": "Boats"
        },
        "bka": {
          "name": "Books &amp; Magazines"
        },
        "bfa": {
          "name": "Business"
        },
        "sya": {
          "name": "Computers"
        },
        "zip": {
          "name": "Free Stuff"
        },
        "fua": {
          "name": "Furniture"
        },
        "foa": {
          "name": "General for Sale"
        },
        "hsa": {
          "name": "Household Items"
        },
        "jwa": {
          "name": "Jewelry"
        },
        "maa": {
          "name": "Materials"
        },
        "rva": {
          "name": "Recreational Vehicles"
        },
        "haa": {
          "name": "Health &amp; Beauty"
        },
        "cto": {
          "name": "Cars &amp; Trucks (By Owner)"
        },
        "ctd": {
          "name": "Cars &amp; Trucks (By Dealer)"
        },
        "cta": {
          "name": "Cars &amp; Trucks"
        },
        "ema": {
          "name": "CDs / DVDs / VHS"
        },
        "moa": {
          "name": "Cell Phones"
        },
        "cla": {
          "name": "Clothing &amp; Accessories"
        },
        "cba": {
          "name": "Collectibles"
        },
        "ela": {
          "name": "Electronics"
        },
        "gra": {
          "name": "Farm &amp; Garden"
        },
        "gms": {
          "name": "Garage &amp; Moving Sales"
        },
        "hva": {
          "name": "Heavy Equipment"
        },
        "mca": {
          "name": "Motorcycles &amp; Scooters"
        },
        "mcy": {
          "name": "Motorcycles &amp; Scooters (By Owner)"
        },
        "mcd": {
          "name": "Motorcycles &amp; Scooters (By Dealer)"
        },
        "mpa": {
          "name": "Motorcycle Parts &amp; Accessories"
        },
        "mpo": {
          "name": "Motorcycle Parts &amp; Accessories (By Owner)"
        },
        "mpd": {
          "name": "Motorcycle Parts &amp; Accessories (By Dealer)"
        },
        "msa": {
          "name": "Musical Instruments"
        },
        "pha": {
          "name": "Photo &amp; Video"
        },
        "taa": {
          "name": "Toys &amp; Games"
        },
        "vga": {
          "name": "Video Gaming"
        }
      }
    }
  },
  $locations = {
    "al": {
      "name": "Alabama",
      "allow_all": false,
      "children": {
        "auburn": {
          "name": "Auburn"
        },
        "bham": {
          "name": "Birmingham"
        },
        "dothan": {
          "name": "Dothan"
        },
        "shoals": {
          "name": "Florence / Muscle Shoals"
        },
        "gadsden": {
          "name": "Gadsden-Anniston"
        },
        "huntsville": {
          "name": "Huntsville / Decatur"
        },
        "mobile": {
          "name": "Mobile"
        },
        "montgomery": {
          "name": "Montgomery"
        },
        "tuscaloosa": {
          "name": "Tuscaloosa"
        }
      }
    },
    "ak": {
      "name": "Alaska",
      "allow_all": false,
      "children": {
        "anchorage": {
          "name": "Anchorage / Mat-Su"
        },
        "fairbanks": {
          "name": "Fairbanks"
        },
        "kenai": {
          "name": "Kenai Peninsula"
        },
        "juneau": {
          "name": "Southeast Alaska"
        }
      }
    },
    "az": {
      "name": "Arizona",
      "allow_all": false,
      "children": {
        "flagstaff": {
          "name": "Flagstaff / Sedona"
        },
        "mohave": {
          "name": "Mohave County"
        },
        "phoenix": {
          "name": "Phoenix"
        },
        "prescott": {
          "name": "Prescott"
        },
        "showlow": {
          "name": "Show Low"
        },
        "sierravista": {
          "name": "Sierra Vista"
        },
        "tucson": {
          "name": "Tucson"
        },
        "yuma": {
          "name": "Yuma"
        }
      }
    },
    "ar": {
      "name": "Arkansas",
      "allow_all": false,
      "children": {
        "fayar": {
          "name": "Fayetteville"
        },
        "fortsmith": {
          "name": "Fort Smith"
        },
        "jonesboro": {
          "name": "Jonesboro"
        },
        "littlerock": {
          "name": "Little Rock"
        },
        "texarkana": {
          "name": "Texarkana"
        }
      }
    },
    "ca": {
      "name": "California",
      "allow_all": false,
      "children": {
        "bakersfield": {
          "name": "Bakersfield"
        },
        "chico": {
          "name": "Chico"
        },
        "fresno": {
          "name": "Fresno"
        },
        "goldcountry": {
          "name": "Gold Country"
        },
        "hanford": {
          "name": "Hanford-Corcoran"
        },
        "humboldt": {
          "name": "Humboldt County"
        },
        "imperial": {
          "name": "Imperial County"
        },
        "inlandempire": {
          "name": "Inland Empire"
        },
        "losangeles": {
          "name": "Los Angeles"
        },
        "mendocino": {
          "name": "Mendocino County"
        },
        "merced": {
          "name": "Merced"
        },
        "modesto": {
          "name": "Modesto"
        },
        "monterey": {
          "name": "Monterey Bay"
        },
        "orangecounty": {
          "name": "Orange County"
        }
      }
    },
    "tx": {
      "name": "Texas",
      "allow_all": false,
      "children": {
        "abilene": {
          "name": "Abilene"
        },
        "amarillo": {
          "name": "Amarillo"
        },
        "austin": {
          "name": "Austin"
        },
        "beaumont": {
          "name": "Beaumont / Port Arthur"
        },
        "brownsville": {
          "name": "Brownsville"
        },
        "collegestation": {
          "name": "College Station"
        },
        "corpuschristi": {
          "name": "Corpus Christi"
        },
        "dallas": {
          "name": "Dallas / Fort Worth"
        },
        "dallas": {
          "name": "Dallas / Fort Worth"
        },
        "nacogdoches": {
          "name": "Deep East Texas"
        },
        "delrio": {
          "name": "Del Rio / Eagle Pass"
        },
        "elpaso": {
          "name": "El Paso"
        },
        "galveston": {
          "name": "Galveston"
        },
        "houston": {
          "name": "Houston"
        },
        "killeen": {
          "name": "Killen / Temple / Ft. Hood"
        },
        "laredo": {
          "name": "Laredo"
        },
        "lubbock": {
          "name": "Lubbock"
        },
        "mcallen": {
          "name": "McAllen / Edinburg"
        },
        "odessa": {
          "name": "Odessa / Midland"
        },
        "sanangelo": {
          "name": "San Angelo"
        },
        "sanantonio": {
          "name": "San Antonio"
        },
        "sanmarcos": {
          "name": "San Marcos"
        },
        "bigbend": {
          "name": "Southwest Texas"
        },
        "texoma": {
          "name": "Texoma"
        },
        "easttexas": {
          "name": "Tyler / East Texas"
        },
        "victoriatx": {
          "name": "Victoria"
        },
        "waco": {
          "name": "Waco"
        },
        "wichitafalls": {
          "name": "Wichita Falls"
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
  methods.getLatest = function( location, category, callback ) {
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