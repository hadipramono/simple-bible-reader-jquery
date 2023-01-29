/*
* Hadi Pramono
* https://github.com/hadipramono
*
*/


var BIBLE_API = 'https://bible-api.com/';

$( document ).ready(function() {

  fnShowBooks();

}).click(function(event) {

  var bookButtonTrigger = findParent($(event.target), ".btn-book");
  var bookSelectTrigger = findParent($(event.target), ".select-book");
  var chapterButtonTrigger = findParent($(event.target), ".btn-chapter");
  var chapterSelectTrigger = findParent($(event.target), ".select-chapter");

  if (bookButtonTrigger.length) {
    let data = $.parseJSON($(event.target).attr("data"));
    fnShowChapters(data);

    $( "#book" ).hide();
    $( "#chapter" ).show();
    $( "#text" ).hide();

    $("html, body").animate({ 
        scrollTop: 0 
    }, "fast");
  }

  if (bookSelectTrigger.length) {
    fnShowBooks();

    $( "#book" ).show();
    $( "#chapter" ).hide();
    $( "#text" ).hide();
  }

  if (chapterButtonTrigger.length) {
    let data = $.parseJSON($(event.target).attr("data"));
    fnShowBibleText(data);

    $( "#book" ).hide();
    $( "#chapter" ).hide();
    $( "#text" ).show();
  }

  if (chapterSelectTrigger.length) {
    $( "#book" ).hide();
    $( "#chapter" ).show();
    $( "#text" ).hide();
  }

});

var BOOKS = fnGetBooks();

function fnShowBooks () {
  let html_book_ot = "<div>";
  let html_book_nt = "<div>";
  $.each(BOOKS, function( index, value ) {
    if (value.testament == 'ot') {
      html_book_ot += "<button class='btn btn-primary btn-book m-1' data='{\"book\":" + value.id +"}'>" + value.abbr + "</button>";
      if (value.id % 3 === 0) {
        html_book_ot += "</div><div>";
      }
    } else {
      html_book_nt += "<button class='btn btn-primary btn-book m-1' data='{\"book\":" + value.id +"}'>" + value.abbr + "</button>";
      if (value.id % 3 === 0) {
        html_book_nt += "</div><div>";
      }
    }
  });

  html_book_ot += "</div>";
  html_book_nt += "</div>";

  $( "#books_ot").append(html_book_ot);
  $( "#books_nt").append(html_book_nt);
}

function fnShowChapters (data) {
  let book = data.book;
  let chapters = BOOKS[book].chapters;

  let html = '';
  html += "<h1 class='select-book'><a href='#'>" + BOOKS[book].name + "</a></h1>";
  html += "<div>";
  for(let i = 1; i <= chapters; i++) {
    html += "<button class='btn btn-primary btn-chapter m-1' data='{\"book\":" + book +", \"chapter\": " + i + "}'>" + i + "</button>";
    if (i % 10 === 0) {
      html += "</div><div>";
    }
  }
  html += "</div>";

  $( "#chapter" ).children().remove();
  $( "#chapter" ).append(html);
}

function fnShowBibleText (data) {
  let book = data.book;
  let chapter = data.chapter;
  
  let bible_api_url = BIBLE_API + encodeURIComponent(BOOKS[book].name + ' ' + chapter);

  let html = '';
  html += "<h1 class='select-chapter'><a href='#'>" + BOOKS[book].name + " " + chapter + "</a></h1>";

  $.getJSON(bible_api_url , function( data ) {
    html += "<div class='text-body'>";
    $.each( data.verses, function( key, val ) {
      html += "<div class='verse'><sup>" + val.verse + "</sup> <span>" + val.text + "</span></div>";
    });
    html += "</div>";

    html += "<div class='pt-5 small'><div>" + data.translation_name + " (" + data.translation_id + ") -- " + data.translation_note + "</div><div>Data from: " + bible_api_url + "</div></div>";

    $( "#text" ).children().remove();
    $( "#text" ).append(html);
  });
}

function findParent(element, parent) {
  if (!element.is(parent)) {
    element = element.parents(parent);
  }
  return element;
}

function fnGetBooks() {
  return {
    "1": {
      "id": 1,
      "abbr": "Gen",
      "name": "Genesis",
      "testament": "ot",
      "division": "pentateuch",
      "chapters": 50
    },
    "2": {
      "id": 2,
      "abbr": "Ex",
      "name": "Exodus",
      "testament": "ot",
      "division": "pentateuch",
      "chapters": 40
    },
    "3": {
      "id": 3,
      "abbr": "Lev",
      "name": "Leviticus",
      "testament": "ot",
      "division": "pentateuch",
      "chapters": 27
    },
    "4": {
      "id": 4,
      "abbr": "Num",
      "name": "Numbers",
      "testament": "ot",
      "division": "pentateuch",
      "chapters": 36
    },
    "5": {
      "id": 5,
      "abbr": "Deut",
      "name": "Deuteronomy",
      "testament": "ot",
      "division": "pentateuch",
      "chapters": 34
    },
    "6": {
      "id": 6,
      "abbr": "Josh",
      "name": "Joshua",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 24
    },
    "7": {
      "id": 7,
      "abbr": "Judg",
      "name": "Judges",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 21
    },
    "8": {
      "id": 8,
      "abbr": "Ruth",
      "name": "Ruth",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 4
    },
    "9": {
      "id": 9,
      "abbr": "1 Sam",
      "name": "1 Samuel",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 31
    },
    "10": {
      "id": 10,
      "abbr": "2 Sam",
      "name": "2 Samuel",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 24
    },
    "11": {
      "id": 11,
      "abbr": "1 Kings",
      "name": "1 Kings",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 22
    },
    "12": {
      "id": 12,
      "abbr": "2 Kings",
      "name": "2 Kings",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 25
    },
    "13": {
      "id": 13,
      "abbr": "1 Chron",
      "name": "1 Chronicles",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 29
    },
    "14": {
      "id": 14,
      "abbr": "2 Chron",
      "name": "2 Chronicles",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 36
    },
    "15": {
      "id": 15,
      "abbr": "Ezra",
      "name": "Ezra",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 10
    },
    "16": {
      "id": 16,
      "abbr": "Neh",
      "name": "Nehemiah",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 13
    },
    "17": {
      "id": 17,
      "abbr": "Est",
      "name": "Esther",
      "testament": "ot",
      "division": "historical_books",
      "chapters": 10
    },
    "18": {
      "id": 18,
      "abbr": "Job",
      "name": "Job",
      "testament": "ot",
      "division": "books_of_wisdom",
      "chapters": 42
    },
    "19": {
      "id": 19,
      "abbr": "Ps",
      "name": "Psalms",
      "testament": "ot",
      "division": "books_of_wisdom",
      "chapters": 150
    },
    "20": {
      "id": 20,
      "abbr": "Prov",
      "name": "Proverbs",
      "testament": "ot",
      "division": "books_of_wisdom",
      "chapters": 31
    },
    "21": {
      "id": 21,
      "abbr": "Eccles",
      "name": "Ecclesiastes",
      "testament": "ot",
      "division": "books_of_wisdom",
      "chapters": 12
    },
    "22": {
      "id": 22,
      "abbr": "Song",
      "name": "Song of Solomon",
      "testament": "ot",
      "division": "books_of_wisdom",
      "chapters": 8
    },
    "23": {
      "id": 23,
      "abbr": "Isa",
      "name": "Isaiah",
      "testament": "ot",
      "division": "major_prophets",
      "chapters": 66
    },
    "24": {
      "id": 24,
      "abbr": "Jer",
      "name": "Jeremiah",
      "testament": "ot",
      "division": "major_prophets",
      "chapters": 52
    },
    "25": {
      "id": 25,
      "abbr": "Lam",
      "name": "Lamentations",
      "testament": "ot",
      "division": "major_prophets",
      "chapters": 5
    },
    "26": {
      "id": 26,
      "abbr": "Ezek",
      "name": "Ezekiel",
      "testament": "ot",
      "division": "major_prophets",
      "chapters": 48
    },
    "27": {
      "id": 27,
      "abbr": "Dan",
      "name": "Daniel",
      "testament": "ot",
      "division": "major_prophets",
      "chapters": 12
    },
    "28": {
      "id": 28,
      "abbr": "Hos",
      "name": "Hosea",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 14
    },
    "29": {
      "id": 29,
      "abbr": "Joel",
      "name": "Joel",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 3
    },
    "30": {
      "id": 30,
      "abbr": "Amos",
      "name": "Amos",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 9
    },
    "31": {
      "id": 31,
      "abbr": "Obad",
      "name": "Obadiah",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 1
    },
    "32": {
      "id": 32,
      "abbr": "Jonah",
      "name": "Jonah",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 4
    },
    "33": {
      "id": 33,
      "abbr": "Mic",
      "name": "Micah",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 7
    },
    "34": {
      "id": 34,
      "abbr": "Nah",
      "name": "Nahum",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 3
    },
    "35": {
      "id": 35,
      "abbr": "Hab",
      "name": "Habakkuk",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 3
    },
    "36": {
      "id": 36,
      "abbr": "Zeph",
      "name": "Zephaniah",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 3
    },
    "37": {
      "id": 37,
      "abbr": "Hag",
      "name": "Haggai",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 2
    },
    "38": {
      "id": 38,
      "abbr": "Zech",
      "name": "Zechariah",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 14
    },
    "39": {
      "id": 39,
      "abbr": "Mal",
      "name": "Malachi",
      "testament": "ot",
      "division": "minor_prophets",
      "chapters": 4
    },
    "40": {
      "id": 40,
      "abbr": "Matt",
      "name": "Matthew",
      "testament": "nt",
      "division": "gospels",
      "chapters": 28
    },
    "41": {
      "id": 41,
      "abbr": "Mark",
      "name": "Mark",
      "testament": "nt",
      "division": "gospels",
      "chapters": 16
    },
    "42": {
      "id": 42,
      "abbr": "Luke",
      "name": "Luke",
      "testament": "nt",
      "division": "gospels",
      "chapters": 24
    },
    "43": {
      "id": 43,
      "abbr": "John",
      "name": "John",
      "testament": "nt",
      "division": "gospels",
      "chapters": 21
    },
    "44": {
      "id": 44,
      "abbr": "Acts",
      "name": "Acts",
      "testament": "nt",
      "division": "history",
      "chapters": 28
    },
    "45": {
      "id": 45,
      "abbr": "Rom",
      "name": "Romans",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 16
    },
    "46": {
      "id": 46,
      "abbr": "1 Cor",
      "name": "1 Corinthians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 16
    },
    "47": {
      "id": 47,
      "abbr": "2 Cor",
      "name": "2 Corinthians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 13
    },
    "48": {
      "id": 48,
      "abbr": "Gal",
      "name": "Galatians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 6
    },
    "49": {
      "id": 49,
      "abbr": "Eph",
      "name": "Ephesians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 6
    },
    "50": {
      "id": 50,
      "abbr": "Phil",
      "name": "Philippians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 4
    },
    "51": {
      "id": 51,
      "abbr": "Col",
      "name": "Colossians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 4
    },
    "52": {
      "id": 52,
      "abbr": "1 Thess",
      "name": "1 Thessalonians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 5
    },
    "53": {
      "id": 53,
      "abbr": "2 Thess",
      "name": "2 Thessalonians",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 3
    },
    "54": {
      "id": 54,
      "abbr": "1 Tim",
      "name": "1 Timothy",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 6
    },
    "55": {
      "id": 55,
      "abbr": "2 Tim",
      "name": "2 Timothy",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 4
    },
    "56": {
      "id": 56,
      "abbr": "Titus",
      "name": "Titus",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 3
    },
    "57": {
      "id": 57,
      "abbr": "Philem",
      "name": "Philemon",
      "testament": "nt",
      "division": "pauline_epistles",
      "chapters": 1
    },
    "58": {
      "id": 58,
      "abbr": "Heb",
      "name": "Hebrews",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 13
    },
    "59": {
      "id": 59,
      "abbr": "James",
      "name": "James",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 5
    },
    "60": {
      "id": 60,
      "abbr": "1 Pet",
      "name": "1 Peter",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 5
    },
    "61": {
      "id": 61,
      "abbr": "2 Pet",
      "name": "2 Peter",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 3
    },
    "62": {
      "id": 62,
      "abbr": "1 John",
      "name": "1 John",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 5
    },
    "63": {
      "id": 63,
      "abbr": "2 John",
      "name": "2 John",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 1
    },
    "64": {
      "id": 64,
      "abbr": "3 John",
      "name": "3 John",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 1
    },
    "65": {
      "id": 65,
      "abbr": "Jude",
      "name": "Jude",
      "testament": "nt",
      "division": "general_epistles",
      "chapters": 1
    },
    "66": {
      "id": 66,
      "abbr": "Rev",
      "name": "Revelation",
      "testament": "nt",
      "division": "apocalyptic_writings",
      "chapters": 22
    }
  }
};

