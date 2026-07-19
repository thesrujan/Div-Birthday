// Configuration file to easily customize text, photos, and dates for the website.
// THIS FILE IS STRICTLY PLATONIC & CELEBRATORY (NO romantic commitments / NO 'love' word)

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  nickname: string;
  datingStartDate: string; // Used as connection start date
  birthMonth: number;      // Month of her birthday
  birthDay: number;        // Day of her birthday
  musicFiles: string[];    // Local music files served from /music
  loveLetter: string;      // The main special birthday note
  reasons: string[];       // 40 reasons she is awesome / appreciated
  timeline: TimelineEvent[];
  gallery: GalleryPhoto[];
  easterEggs: string[];    // Sweet friendly easter eggs
  romanticQuotes: string[]; // Warm connection quotes shown on scroll
}

export const birthdayData: BirthdayConfig = {
  girlfriendName: "Divya",
  nickname: "Divya",
  datingStartDate: "2024-03-01", // Days Connected counter starts from here
  birthMonth: 7,                  // July
  birthDay: 27,                  // 27th
  
  musicFiles: [
    "WhatsApp Audio 2026-07-18 at 4.35.12 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.35.55 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.37.35 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.38.02 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.38.38 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.39.07 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.40.21 PM.mpeg",
    "WhatsApp Audio 2026-07-18 at 4.42.22 PM.mpeg",
  ],
  
  loveLetter: `Dearest Divya,

I wanted to create something truly unique that none of your friends has ever done.

I know this won't be the most special birthday wish anyway. The reason I'm doing this is because, if I don't get a chance to meet you, I want to show you how special you are to me.

From the moment we started talking, I genuinely began thinking about you every day. I got so deeply connected to you that I can't control myself from texting you or talking to you even for a single day. I've never had this kind of feeling before, and I wish I'll carry this feeling forever.

One thing I've always admired about you is how deeply you care about the people you love. I still remember the day you got emotional while talking to me after a misunderstanding with someone close to you. Hearing you cry left me speechless. My mind went completely blank because I didn't know how to comfort you. That moment made me realize how genuine your heart is and how much love and care you carry within you. You're truly an amazing person.

You're incredibly beautiful, adorable, magnificent, elegant, pretty, and gorgeous. I deeply appreciate every picture you've sent me because they make me feel like I've seen you for a long time. I still can't believe that I'm wishing to a human being (DIVYA)... or maybe a ghost "The person I've never seen before for years." 😂

I don't know how long you keep me waiting to see you!!.

I think,

"The longer I wait, the hotter I date... and it seems like I'm dating a volcano."

God knows when it's going to erupt.

Wishing you a day as wonderful as you are and a year ahead filled with happiness and success.

Happy Birthday, Diva. ❤️

Diva comes from the Italian word meaning "Goddess," and honestly... I think it suits you perfectly.

I have one wish... I really hope you join BMS College for your master's.

Maybe then, destiny will finally give me the chance to meet you everyday so I can stop begging you to meet me again and again

Until then...

Take care of yourself, keep smiling, and never stop annoying me.

Happy Birthday once again, Divya. ❤️`,

  reasons: [
    "Your unique sense of humor that always makes me laugh.",
    "Your kind and compassionate heart.",
    "How incredibly smart and inspiring you are.",
    "The amazing music recommendations you share.",
    "Your positive energy that brightens up my day.",
    "Your creative way of looking at the world.",
    "How easy and natural it is to talk to you.",
    "Your thoughtful advice when I need a fresh perspective.",
    "Your dedication and passion for your goals.",
    "How you make even simple chats feel interesting.",
    "Your beautiful, radiant smile.",
    "Your sense of adventure and curiosity.",
    "The cute way you wrinkle your nose when you're thinking.",
    "How supportive you are of the people around you.",
    "Your constant interest in learning new things.",
    "Your unique sense of style and elegance.",
    "The calm and peaceful vibe you carry.",
    "Your appreciation for the little things in life.",
    "How you stand up for what is right.",
    "Your witty remarks that always catch me off guard.",
    "How you remember the small details of our conversations.",
    "The warmth and kindness in your voice.",
    "Your interest in books and deep thoughts.",
    "How you can make anyone feel welcome and heard.",
    "Your playful and goofy side.",
    "How you never hesitate to help someone in need.",
    "Your resilience in overcoming challenges.",
    "The interesting stories you tell about your day.",
    "Your passion for your hobbies and dreams.",
    "How you bring a fresh perspective to everything.",
    "The honesty and authenticity you show.",
    "Your beautiful laugh that is so contagious.",
    "How you appreciate nature and small joys.",
    "Your ability to see the good in people.",
    "The cool, calm energy you bring to chats.",
    "How you inspire me to learn and grow.",
    "Your amazing talent and creative skills.",
    "The fun inside jokes we've created.",
    "The bright and happy future you are working towards.",
    "Simply because you are an incredibly special person."
  ],

  timeline: [
    {
      date: "The Beginning",
      title: "First Morning Wish",
      description: "The very first good morning that started it all. That one message changed everything.",
      image: "/pictures/connection/First morning wish.PNG"
    },
    {
      date: "A Big First",
      title: "First Time Call",
      description: "That first call felt like we had known each other forever. Time just disappeared.",
      image: "/pictures/connection/First time call.PNG"
    },
    {
      date: "Every Single Day",
      title: "Unbreakable Streaks",
      description: "Not one day missed. Not one. That says everything about us.",
      image: "/pictures/connection/Unbreakable streaks.PNG"
    },
    {
      date: "Our Favorite Hours",
      title: "Late Night Calls",
      description: "The world goes quiet and it's just us. Those late night calls are the best part of my day.",
      image: "/pictures/connection/late night calls.PNG"
    },
    {
      date: "Always & Forever",
      title: "Picture Sharing",
      description: "Every picture you sent, I kept. Every single one. Because every one of them is you.",
      image: "/pictures/connection/picture sharing.PNG"
    }
  ],

  gallery: [
    {
      url: "/pictures/DVVL0625.JPG",
      caption: "You know how much I react when I see this image and expressed for it. That haircut One of my favorites! I kept this as my WhatsApp wallpaper. 🥺"
    },
    {
      url: "/pictures/FKIG4586.JPG",
      caption: "The way you were smiling here, like you had no idea how beautiful you looked. Classic you."
    },
    {
      url: "/pictures/IMG_E3189.JPG",
      caption: "This post keeps reminding me to watch it every single time. Every. Single. Time. 🔁"
    },
    {
      url: "/pictures/IMG_E3190.JPG",
      caption: "Black saree suits you like it suits nobody else. Like it was literally made for you, Divya. 🖤✨"
    },
    {
      url: "/pictures/IMG_E3191.JPG",
      caption: "This video was so adorable — you look like a real life Barbie doll. I am not even kidding. 🎀"
    },//6
    {
      url: "/videos/6th.mov",
      caption: "The way you look just takes my heart away. And the way you flip your hair in that video! So cool. 💫"
    },//7
    {
      url: "/videos/7th.mp4",
      caption: "You are just adorable. Glamorous. 🌸 There is no other word for it."
    },
    {
      url: "/pictures/IMG_E3194.JPG",
      caption: "We had just started talking and you suddenly dropped this saree picture. I scroll through all your pictures one by one, every single day. 🌹"
    },
    {
      url: "/pictures/IMG_E3195.JPG",
      caption: "I thought bangs looked good on you!, then I saw this. Now I know every hairstyle is literally made for you. 😍"
    },
    {
      url: "/pictures/IMG_E3196.JPG",
      caption: "That stare... it melts my heart like an iceberg. Those eyes, Divya. Those eyes. 🥺👀"
    },
    {
      url: "/pictures/IMG_E3197.JPG",
      caption: "One of my absolute favorites. You look like a painting, like someone drew you after seeing the most beautiful thing in the world. 🎨"
    },
    {
      url: "/pictures/NHSME3782.JPG",
      caption: "You first sent this for me to edit and you did not even like it. But it looked like AI-perfected art to me, I loved it more than you knew. 💙"
    },
    {
      url: "/pictures/QXPN3611.JPG",
      caption: "The bang hairstyle, you know how much I love this. You already know. 🤍"
    },
    {
      url: "/pictures/SRDQ7841.JPG",
      caption: "Last but most definitely not least. No words. I saved this as your call cover so I can feel your voice and feel like you are near, even when you are not. 📞❤️"
    }
  ],

  easterEggs: [
    "You have the absolute best music taste! 🎵",
    "Wishing you a year filled with wonderful adventures! ✈️✨",
    "You are a very bright presence in my life. 🌟",
    "You are the CSS to my HTML—without you, I'd have no style. 💻🌸",
    "May all your birthday wishes come true today! 🎂",
    "My favorite notifications are the ones that come from you. 📱✨",
    "I appreciate you more than coffee (and that is saying A LOT!) ☕✨"
  ],

  romanticQuotes: [
    "There is nothing on this earth more to be prized than true connection. — Thomas Aquinas",
    "In the sweetness of connection let there be laughter, and sharing of pleasures. — Khalilil Gibran",
    "A warm smile is the universal language of kindness. — William Arthur Ward",
    "Each connection represents a world in us, a world possibly not born until they arrive. — Anais Nin",
    "The best of life is connection. — Unknown",
    "May you live all the days of your life. — Jonathan Swift"
  ]
};
