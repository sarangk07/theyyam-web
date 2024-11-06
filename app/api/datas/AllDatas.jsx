const TDatas = [
    {
        "name": "Kookkanam Muthappan Madappura",
        "place": "Kookkanam",
        "location": "Kannur",
        "phone": "+91 9874568975",
        "address": "Kannur, Payyanur, Karivellur, Kookkanam",
        "img": "",
        "images": ["", "", "", ""],
        "popularity": 3,
        "festival_duration_days": 2,
        "malayala_masam":'',
        "festival_start_time": "February 21",
        "festival_end_time": "February 22",
        "theyyams": [
            "Muthappan",
            "Thiruvappan"
        ]
    },
    {
        "name": "Pottan Theyyam Devastanam",
        "place": "Kodakkad",
        "location": "",
        "phone": "",
        "address": "Kasargod, Vellachal, Kodakkad",
        "img": "",
        "images": ["", "", "", ""],
        "popularity": 3,
        "festival_duration_days": 2,
        "malayala_masam":'',
        "festival_start_time": "March 2",
        "festival_end_time": "March 3",
        "theyyams": [
            "Pottan Theyyam"
        ]
    },
    {
        "name": "Thimiri kottumburam Dharmasastha Chamundeswari Kshethram",
        "place": "Thimiri",
        "location": "",
        "phone": "",
        "address": "Kasargod, Cheruvathur, Palathera, Thimiri",
        "img": "",
        "images": ["https://travelkannur.com/wp-content/uploads/2015/05/dhamadam_valiya_veedu_vishwakarma_bhairavan-1024x768.jpg", "https://travelkannur.com/wp-content/uploads/2016/03/sasthappan02-730x428.jpg", "https://travelkannur.com/wp-content/uploads/2015/04/dsc01713.jpg", ""],
        "popularity": 4,
        "festival_duration_days": 3,
        "malayala_masam":'',
        "festival_start_time": "April 28",
        "festival_end_time": "April 30",
        "theyyams": [
            "Kuttichathan",
            "Bhairavan",
            "Madayil Chamundi",
            "Raktha Chamundi",
            "Thiruvarkkat Bhagavathy",
            "Ankakkulangara Bhagavathy",
            "Vishnumurthy",
            "Valiya Valappil Chamundi"
        ]
    },
    {
        "name": "Erikkulam Sree Vettakkorumakan Temple",
        "place": "Madikkai",
        "location": "",
        "phone": "",
        "address": "",
        "img": "",
        "images": ["", "", "", ""],
        "popularity": 2,
        "festival_duration_days": 4,
        "malayala_masam":'',
        "festival_start_time": "December 22",
        "festival_end_time": "December 25",
        "theyyams": [
            "Oorpazhassi",
            "Vettakkorumakan"
        ]
    },
    {
        "name": "Narikkode Sree Puthiya Bhagavathi Kshethram",
        "place": "Ezhome",
        "location": "",
        "phone": "",
        "address": "",
        "img": "https://lh5.googleusercontent.com/p/AF1QipPQV8TBtskhutjYa-dszwOwVYcs-V9IGnDIMP4=w426-h240-k-no",
        "images": ["", "", "", ""],
        "popularity": 3,
        "festival_duration_days": 2,
        "malayala_masam":'',
        "festival_start_time": "November 27",
        "festival_end_time": "November 28",
        "theyyams": [
            "Puthiya Bhagavathy",
            "Vishnumurthy",
            "Gulikan",
            "Veera Kali",
            "Bhadrakali",
            "Paadarkulangara Veeran"
        ]
    },
    {
        "name": "Thaliparamba Aadikkumpara Puthiyabhagavathy Karimchamundi Sthanam",
        "place": "Aadikkumpara",
        "location": "",
        "phone": "",
        "address": "",
        "img": "",
        "images": ["", "", "", ""],
        "popularity": 3,
        "festival_duration_days":2,
        "malayala_masam":'',
        "festival_start_time": "April 29",
        "festival_end_time": "April 30",
        "theyyams": [
            "Gulikan", "Karim Chamundi", "Puthiya Bhagavathy", "Veera Kali","Veeran"
        ]
    },

    {
        "name": "Cheruvathur Kuttamath Ponmalam Sri Vishnumurthy Temple",
        "place": "Kuttamath",
        "location": "",
        "phone": "",
        "address": "",
        "img": "https://www.keralatourism.org/images/ebooks/dance-of-divine/large/kuttamath_ponmalam_sri_vishnumurthy_temple20171020115138.JPG",
        "images": ["", "", "", ""],
        "popularity": 3,
        "festival_duration_days":3,
        "malayala_masam":'Thulam 21-23',
        "festival_start_time": "November 7",
        "festival_end_time": "November 9",
        "theyyams": [
            "Ankakkulangara Bhagavathy", "Raktha Chamundi", "Ottakolam", "Vishnumurthy"
        ]
    },
    {
        "name": "Pilicode Sree Rayaramangalam Vishnumurthy Temple",
        "place": "Pilicode",
        "location": "",
        "phone": "",
        "address": "",
        "img": "https://travelkannur.com/wp-content/uploads/2016/06/veethukunnu-vishnumoorthy-ksh-730x428.jpg",
        "images": ["", "", "", ""],
        "popularity": 2,
        "festival_duration_days":2,
        "malayala_masam":'Thulam 21-22',
        "festival_start_time": "November 6",
        "festival_end_time": "November 7",
        "theyyams": [
            "Ankakkulangara Bhagavathy", "Raktha Chamundi", "Ottakolam"
        ]
    },
    {
        "name": "Madikai Erikkulam Padinharchamundi Kshethram",
        "place": "Erikkulam",
        "location": "",
        "phone": "",
        "address": "",
        "img": "",
        "images": ["", "", "", ""],
        "popularity": 4,
        "festival_duration_days":9,
        "malayala_masam":'Thulam 21-29',
        "festival_start_time": "November 7",
        "festival_end_time": "November 15",
        "theyyams": [
            "Anchanangum Bhootham", "Raktha Chamundi", "Vishnumurthy","Gulikan","Padinjare Chamundi","Raktheswari"
        ]
    },
];


export default TDatas;