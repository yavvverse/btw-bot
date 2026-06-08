import { Telegraf, Markup } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands([
  { command: "start", description: "Перезапустити термінал ⚡️" },
  { command: "help", description: "Мануал до терміналу 🆘" },
  { command: "dossier", description: "📸 Досьє" },
  { command: "game", description: "🎮 Квест: ІПЗ" },
  { command: "tarot", description: "🔮 Матриця Долі" },
  { command: "best_event", description: "🏆 Твій BEST-івент" },
]);

// --- ГОЛОВНЕ МЕНЮ ---
// --- ГОЛОВНЕ МЕНЮ ---
bot.start(async (ctx) => {
  // 1. Перша частина тексту (чіпляє нижню клавіатуру)
  await ctx.reply("⚡️ <b>Ініціалізація успішна...</b>\n\n", {
    parse_mode: "HTML",
    ...Markup.keyboard([
      ["📸 Досьє", "🎮 Квест: ІПЗ"],
      ["🔮 Матриця Долі", "🏆 Твій BEST-івент"],
      ["📞 Контакти"],
    ]).resize(),
  });

  // 2. Друга частина тексту (виводить інлайн-кнопки)
  await ctx.reply(
    "Ну що ж, продовжуємо? Обирай дію в меню нижче 👇\n\n<i>P.S. Якщо загубишся у функціоналі — тисни /help</i>",
    {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("📸 Досьє", "menu_dossier"),
          Markup.button.callback("🎮 Квест", "menu_game"),
        ],
        [
          Markup.button.callback("🔮 Матриця", "menu_tarot"),
          Markup.button.callback("🏆 BEST-івент", "menu_best"),
        ],
        [Markup.button.callback("📞 Контакти", "menu_contacts")],
      ]),
    },
  );
});
bot.help((ctx) => {
  ctx.reply(
    "<b>Мануал користувача 👾</b>\n\n📸 <b>Досьє</b> — Секретна папка з моєю базою даних.\n🎮 <b>Квест: ІПЗ</b> — Survival-хорор у стінах Львівської політехніки.\n🔮 <b>Матриця Долі</b> — Генератор щоденного вайбу.\n🏆 <b>Твій BEST-івент</b> — Підозріло точний тест.\n📞 <b>Контакти</b> — Мої координати для зв'язку.",
    { parse_mode: "HTML" },
  );
});

// --- КОНТАКТИ ---
// --- КОНТАКТИ ---
const showContacts = async (ctx) => {
  if (ctx.callbackQuery) await ctx.answerCbQuery();
  await ctx.replyWithMediaGroup([
    {
      type: "photo",
      media: { source: "./media/contact_photo_1.jpg" },
    },
    {
      type: "photo",
      media: { source: "./media/contact_photo_2.jpg" },
    },
  ]);
  await ctx.reply(
    "📞 <b>Зв'язок зі мною</b>\n\nТут можна мене знайти:\n\n📷 <b>Instagram:</b> <a href='https://www.instagram.com/yavverse___'>@yavverse___</a>\n✈️ <b>Telegram:</b> @owr_anny\n📱 <b>Телефон (мобільний):</b> +380 95 701 91 49",
    { parse_mode: "HTML" },
  );
};
bot.hears("📞 Контакти", showContacts);
bot.action("menu_contacts", showContacts);

// --- БАЗА ДАНИХ ДЛЯ ГАЛЕРЕЙ (Генератор заглушок) ---
const getDummyMedia = (type, text) => {
  if (type === "video") return "https://www.w3schools.com/html/mov_bbb.mp4"; // Універсальне тестове відео
  return `https://placehold.co/600x400/png?text=${encodeURIComponent(text)}`;
};

const generateGallery = (prefix, photoCount, videoCount) => {
  const items = [];
  for (let i = 1; i <= photoCount; i++) {
    items.push({
      type: "photo",
      media: getDummyMedia("photo", `${prefix} Photo ${i}`),
      caption: `📸 Фото ${i} з розділу "${prefix}".\nПізніше я про це щось розкажу 😉`,
    });
  }
  for (let i = 1; i <= videoCount; i++) {
    items.push({
      type: "video",
      media: getDummyMedia("video", `${prefix} Video ${i}`),
      caption: `🎥 Відео ${i} з розділу "${prefix}".\nПізніше я про це щось розкажу 😉`,
    });
  }
  return items;
};

// Зберігаємо наші великі галереї
// Зберігаємо наші великі галереї з твоїми реальними фото/відео
// Зберігаємо наші великі галереї (локальні файли з папки media)
const galleries = {
  dog: [
    {
      type: "photo",
      media: { source: "./media/dog_photo_1.jpg" },
      caption: "Обожнюю собак🐾. Це Барні, найкращий у своєму роді пес!😁",
    },
    {
      type: "photo",
      media: { source: "./media/dog_photo_2.jpg" },
      caption: "Смішний 🐶",
    },
    {
      type: "photo",
      media: { source: "./media/dog_photo_3.jpg" },
      caption: "Мій пухнастий антистрес з покерфейсом✨",
    },
    {
      type: "photo",
      media: { source: "./media/dog_photo_4.jpg" },
      caption: "Барнюська і Муська 🫶",
    },
    {
      type: "photo",
      media: { source: "./media/dog_photo_5.jpg" },
      caption: "Коли намагаєшся кодити, а він вимагає уваги 💻",
    },
    {
      type: "photo",
      media: { source: "./media/dog_photo_6.jpg" },
      caption: "Найкращий хлопчик 🦴",
    },
    {
      type: "video",
      media: { source: "./media/dog_video_1.mov" },
      caption: "Вколов носа 🦔",
    },
  ],

  selo: [
    {
      type: "photo",
      media: { source: "./media/selo_photo_1.jpg" },
      caption: "Рандомний кітік!╰(*°▽°*)╯",
    },
    {
      type: "photo",
      media: { source: "./media/selo_photo_2.jpg" },
      caption: "Сільська рада у всій своїй красі",
    },
    {
      type: "video",
      media: { source: "./media/selo_video_1.mov" },
      caption: "Качечки восени🍂🎥",
    },
    {
      type: "video",
      media: { source: "./media/selo_video_2.mov" },
      caption: "Качечки зимою ☃️🎥",
    },
    {
      type: "video",
      media: { source: "./media/selo_video_3.mov" },
      caption: "Вперше побачила такий великий місяць🫣",
    },
  ],

  sky: [
    {
      type: "photo",
      media: { source: "./media/sky_photo_1.jpg" },
      caption: "1 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_2.jpg" },
      caption: "2 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_3.jpg" },
      caption: "3 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_4.jpg" },
      caption: "4 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_5.jpg" },
      caption: "5 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_6.jpg" },
      caption: "6 або 7 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_7.jpg" },
      caption: "6 або 7 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_8.jpg" },
      caption: "8 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_9.jpg" },
      caption: "9 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_10.jpg" },
      caption: "10 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_11.jpg" },
      caption: "11 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_12.jpg" },
      caption: "12 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_13.jpg" },
      caption: "13 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_14.jpg" },
      caption: "14 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_15.jpg" },
      caption: "15 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_16.jpg" },
      caption: "16 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_17.jpg" },
      caption: "17 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_18.jpg" },
      caption: "18 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_19.jpg" },
      caption: "19 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_20.jpg" },
      caption: "20 ☁️",
    },
    {
      type: "photo",
      media: { source: "./media/sky_photo_21.jpg" },
      caption: "21 ☁️",
    },
    {
      type: "video",
      media: { source: "./media/sky_video_1.mov" },
      caption: "1 🎥",
    },
    {
      type: "video",
      media: { source: "./media/sky_video_2.mov" },
      caption: "2 🎥",
    },
    {
      type: "video",
      media: { source: "./media/sky_video_3.mov" },
      caption: "3 🎥",
    },
    {
      type: "video",
      media: { source: "./media/sky_video_4.mov" },
      caption: "4 🎥",
    },
  ],
};
// --- ДОСЬЄ МЕНЮ ---
const showDossierMenu = async (ctx) => {
  if (ctx.callbackQuery) await ctx.deleteMessage().catch(() => {});
  await ctx.reply(
    "<b>Особиста справа: Yarema Anna</b> 📂\n\nОбирай розділ, щоб дізнатися про мої виживання, любов до коду та пухнастих антистресів 👇",
    {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("🏡 Село", "gal_selo_0"),
          Markup.button.callback("🤪 Фан", "doss_fun"),
        ],
        [
          Markup.button.callback("💻 Кодинг", "doss_coding"),
          Markup.button.callback("☁️ Небо", "gal_sky_0"),
        ],
        [
          Markup.button.callback("🧮 Лінал", "doss_linal"),
          Markup.button.callback("🐾 Барнюська", "gal_dog_0"),
        ],
      ]),
    },
  );
};
bot.hears("📸 Досьє", showDossierMenu);
bot.action("menu_dossier", showDossierMenu);

// --- ОБРОБНИК ІНТЕРАКТИВНИХ ГАЛЕРЕЙ (Село, Небо, Песик) ---
bot.action(/gal_(.+)_(.+)/, async (ctx) => {
  const category = ctx.match[1];
  const index = parseInt(ctx.match[2]);
  const gallery = galleries[category];

  if (!gallery || !gallery[index]) return ctx.answerCbQuery("Помилка галереї");
  const item = gallery[index];

  // Кнопки навігації
  const buttons = [];
  if (index > 0)
    buttons.push(
      Markup.button.callback("⬅️ Попереднє", `gal_${category}_${index - 1}`),
    );
  if (index < gallery.length - 1)
    buttons.push(
      Markup.button.callback("Наступне ➡️", `gal_${category}_${index + 1}`),
    );

  const kb = Markup.inlineKeyboard([
    buttons,
    [Markup.button.callback("🔙 Назад до досьє", "menu_dossier")],
  ]);

  const fullCaption = `<b>${category.toUpperCase()}</b>\n\n${item.caption}\n\n<i>(Файл ${index + 1} з ${gallery.length})</i>`;

  try {
    // Спроба плавно замінити фото/відео, якщо ми вже в галереї
    await ctx.editMessageMedia(
      {
        type: item.type,
        media: item.media,
        caption: fullCaption,
        parse_mode: "HTML",
      },
      { reply_markup: kb.reply_markup },
    );
  } catch (err) {
    // Якщо користувач щойно перейшов з текстового меню — видаляємо меню і надсилаємо медіа
    await ctx.deleteMessage().catch(() => {});
    if (item.type === "video") {
      await ctx.replyWithVideo(item.media, {
        caption: fullCaption,
        parse_mode: "HTML",
        ...kb,
      });
    } else {
      await ctx.replyWithPhoto(item.media, {
        caption: fullCaption,
        parse_mode: "HTML",
        ...kb,
      });
    }
  }
});

// --- РОЗДІЛ "ФАН" (З підкатегоріями) ---
// --- РОЗДІЛ "ФАН" (З підкатегоріями) ---
bot.action("doss_fun", async (ctx) => {
  await ctx.deleteMessage().catch(() => {});

  await ctx.reply("<b>🤪 Фан-розділ</b>\n\nОбирай, що хочеш побачити:", {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback("🎮 Ігри", "fun_games"),
        Markup.button.callback("📺 Тєлік", "fun_tv"),
      ],
      [
        Markup.button.callback("🍿 Фільми", "fun_movies"),
        Markup.button.callback("🌵 Кактуси", "fun_cacti"),
      ],
      [Markup.button.callback("🔙 Назад до досьє", "menu_dossier")],
    ]),
  });
});
// Хелпер для одиночних фото/відео у Фані та Кодингу
const sendSingleMedia = async (
  ctx,
  type,
  mediaUrl,
  caption,
  backAction = "doss_fun",
) => {
  await ctx.deleteMessage().catch(() => {});
  const kb = Markup.inlineKeyboard([
    [Markup.button.callback("🔙 Назад", backAction)],
  ]);
  if (type === "video") {
    await ctx.replyWithVideo(mediaUrl, { caption, parse_mode: "HTML", ...kb });
  } else {
    await ctx.replyWithPhoto(mediaUrl, { caption, parse_mode: "HTML", ...kb });
  }
};

bot.action("fun_games", (ctx) =>
  sendSingleMedia(
    ctx,
    "photo",
    { source: "./media/fun_games.jpg" },
    "🎮 <b>Ігри</b>\n\n Цією мітлою було відпижджено 10 000 покупців угрі SUpermarket Together.",
  ),
);
bot.action("fun_tv", (ctx) =>
  sendSingleMedia(
    ctx,
    "video",
    { source: "./media/fun_tv.mov" }, // або .mov, якщо відео з айфона
    "📺 <b>CAST</b>\n\nЗ сіс відкрили для себе транслювання екрану телефона на тєлік🤯",
  ),
);
bot.action("fun_movies", (ctx) =>
  sendSingleMedia(
    ctx,
    "video",
    { source: "./media/fun_movies.mov" }, // або .mov
    "🍿 <b>Фільми</b>\n\nЩо ж фільми я дивлюсь рідко, але якщо й беруся за них, то завжди оберу жахи. Мій топ серед фільмів жахів це 3 частини Закляття. А перший фільм жахів, який я подивилася це Монахиня, і це просто класна комедія, ахахахах😁",
  ),
);

bot.action("fun_cacti", (ctx) =>
  sendSingleMedia(
    ctx,
    "video",
    { source: "./media/fun_cacti.mov" }, // або .mov
    "🌵 <b>Кактуси</b>\n\n Кактус, що вижив...\n Мої улюблені рослини це кактуси. В мене їх було аж 6, але з моїм умінням їх поливати 3 зігнило і 2 засохло (я теж не знала, що можна засушити кактуси, виявляється можна😬), і лише один єдиний досі живий, так ще й квітне!!😍",
  ),
);

// --- ОДИНОЧНІ КАТЕГОРІЇ З ГОЛОВНОГО МЕНЮ ДОСЬЄ ---
// --- ОДИНОЧНІ КАТЕГОРІЇ З ГОЛОВНОГО МЕНЮ ДОСЬЄ ---
bot.action("doss_coding", (ctx) =>
  sendSingleMedia(
    ctx,
    "photo",
    { source: "./media/coding_photo_1.jpg" },
    "💻 <b>Кодинг</b>\n\nКоджу в будь-якому зручному місці, останнім часом полюбилося кодитив маршрутці, дорогою додому чи до ЛЬвова😼",
    "menu_dossier",
  ),
);

bot.action("doss_linal", async (ctx) => {
  await ctx.deleteMessage().catch(() => {});
  await ctx.replyWithPhoto(
    { source: "./media/linal_photo_1.jpg" },
    {
      caption: `🧮 <b>Лінал, Discord і 10 хв сну...</b>\n\nЗначить написала я з ші-шкою розрахи в першому семестрі за місяць до їх здачі, і благополучно забила на них. Ходила вихвалялася і тішилася, що всьо зроблено. Як тут прийшов час їх здавати, і я вирішила за декілька днів до здачі їх переглянути, підготуватися... І виявила, що розв'язки неправильні. І вийшло так, що мої друзі, які не робили розрахи до того, що я писали її разом в діскорді за 1 ніч до здачі. Вони ще й досі мені це згадують. \n\nАле найцікавіше те, що сидимо ми вже якусь енну годину в діскорді пишемо, на годиннику 3 ночі і мені в голову приходить ідея поспати всього  10 хвилин. І я прошу друзів, щоб вони розбудили мене через 10 хвилин, подзвонили мені. Я заснула. Через 10 хвилин мені дзвонить Богдан, я кажу що встала, а сама думаю ще 5 хвилин поспати. В результаті я прокинулась о 6-й ранку з жахом, бо мені було потрібно написати ще 6 завдань.`,
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.callback("🔙 Назад до досьє", "menu_dossier")],
      ]),
    },
  );
});
// --- БЛОК: КВЕСТ "ВИЖИТИ НА ІПЗ" (RPG MODE) ---
const questScenarios = {
  cw_deadline: {
    chapter: "Тиждень 14: Передсесійна агонія",
    location: "Гуртожиток №5",
    text: "На годиннику 20:59. Дедлайн завантаження курсової у ВНС — 23:59. Богдан вже скинув мем про відрахування, а в тебе тільки титулка і наполовину робочий код на С++, який крашиться через загадковий Segmentation fault. Повітря в кімнаті густе від відчаю.",
    choices: [
      {
        text: "☕ Заварити потрійну каву і кодити як проклятий",
        result:
          "Серце стукає в ритмі техно, але ти знайшла витік пам'яті! Завантажила файл о 23:58. Живемо!",
        effects: { hp: -15, xp: 25, cof: -1, rep: 5 },
        next: "unexpected_teacher",
      },
      {
        text: "👀 Попросити код Богдана 'для натхнення'",
        result:
          "MOSS-антиплагіат не спить. Викладач побачив 85% збігу і викликав обох на серйозну розмову.",
        effects: { hp: -30, xp: 0, cof: 0, rep: -15 },
        next: "unexpected_teacher",
      },
      {
        text: "💅 Зробити розкішний UI і забити на логіку",
        result:
          "Програма ледь рахує матриці, але інтерфейс — просто цукерочка. Захист буде базуватися на твоїй харизмі.",
        effects: { hp: -5, xp: 10, cof: 0, rep: 0 },
        next: "unexpected_teacher",
      },
    ],
  },
  unexpected_teacher: {
    chapter: "Тиждень 5: Сюрпризи розкладу",
    location: "1-й корпус, авд. 321",
    text: "Замість доброго аспіранта в аудиторію заходить сувора математик Андрусяк. 'Дістаємо подвійні листочки', — каже він тоном, що не терпить заперечень. Оксана миттєво дістає ручку, а ти розумієш, що не пам'ятаєш жодної формули з ліналу.",
    choices: [
      {
        text: "🧠 Напружити звивини і писати самій",
        result:
          "Згадала базу методу Гауса! Андрусяк оцінила старання, хоч і покреслив половину листка.",
        effects: { hp: -15, xp: 20, cof: 0, rep: 10 },
        next: "dean_vs_class",
      },
      {
        text: "📱 Гуглити під партою на WiFi політеху",
        result:
          "Eduroam відвалився на найважливішому моменті. Андрусяк помітила телефон і вказав на двері.",
        effects: { hp: -25, xp: 5, cof: 0, rep: -10 },
        next: "dean_vs_class",
      },
      {
        text: "🎭 Зімітувати напад мігрені і вийти",
        result:
          "Уникнула контрольної, але тепер Андрусяк чекає тебе на відпрацюванні в суботу о 8:00.",
        effects: { hp: 5, xp: 0, cof: 0, rep: -5 },
        next: "dean_vs_class",
      },
    ],
  },
  dean_vs_class: {
    chapter: "Тиждень 8: Бюрократичний квест",
    location: "Деканат (5-й корпус)",
    text: "Черга в деканат тягнеться аж до сходів, а секретарка пішла пити чай. Тобі дуже потрібна довідка для гуртожитку, але через 10 хвилин пара в Андрусяк. В чат групи пишуть, що вона сьогодні злюща і готує міні-тест.",
    choices: [
      {
        text: "⏳ Залишитись в черзі, довідка важливіша",
        result:
          "Довідку взяв, але Левус вліпила 'нб' і мінус бал за тест. Твій рейтинг плаче.",
        effects: { hp: -10, xp: 0, cof: 0, rep: -15 },
        next: "lab_blackout",
      },
      {
        text: "🏃‍♀️ Плюнути на чергу і бігти на пару",
        result:
          "Влетів в аудиторію зі дзвінком! Здав тест на середній бал, зате Левус похвалила за пунктуальність.",
        effects: { hp: -5, xp: 15, cof: 0, rep: 10 },
        next: "lab_blackout",
      },
      {
        text: "☕ Дати хабаря кавою комусь у черзі",
        result:
          "Витратив дорогоцінну каву на третьокурсника, зате встиг і тест написати, і довідку забрати!",
        effects: { hp: 10, xp: 5, cof: -1, rep: 5 },
        next: "lab_blackout",
      },
    ],
  },
  lab_blackout: {
    chapter: "Тиждень 10: Темні часи",
    location: "5-й корпус, 810-г",
    text: "Ти якраз дописав складну функцію. Палець тягнеться до 'Ctrl+S', і тут... монітор гасне. Аудиторія занурюється в темряву. Хтось на задній парті голосно матюкається. Викладач зітхає: 'Ну, захищаємо те, що є на флешках'.",
    choices: [
      {
        text: "🗣 Заговорити зуби, що код був геніальний",
        result:
          "Викладач посміявся з твоєї красномовності і поставив 'трояку' за старання. Могло бути гірше.",
        effects: { hp: -5, xp: 10, cof: 0, rep: 5 },
        next: "starosta_elections",
      },
      {
        text: "💻 Дістати ноут і роздати інет з телефону",
        result:
          "Ноут був заряджений! Ти не тільки здав свою лабу, а й да Богдану завантажити його звіт. Ти — герой.",
        effects: { hp: 5, xp: 20, cof: 0, rep: 15 },
        next: "starosta_elections",
      },
      {
        text: "😱 Сидіти в темряві і панікувати",
        result:
          "Лабу не зарахували. Твій ідеальний код втрачено назавжди. Доведеться переписувати вдома.",
        effects: { hp: -25, xp: 0, cof: 0, rep: -5 },
        next: "starosta_elections",
      },
    ],
  },
  starosta_elections: {
    chapter: "Тиждень 2: Розподіл влади",
    location: "Гол. корпус, авд. 114",
    text: "Куратор дивиться на список першокурсників. 'Отже, хто хоче бути старостою?'. Усі різко починають вивчати тріщини на стелі.",
    choices: [
      {
        text: "👑 Взяти владу в свої руки",
        result:
          "Ти тепер староста! Викладачі тебе знають, є бонуси, але твій телефон розривається 24/7.",
        effects: { hp: -25, xp: 15, cof: 0, rep: 25 },
        next: "END",
      },
      {
        text: "🙅‍♀️ Відмовитись і висунути Оксану",
        result:
          "Оксана стала чудовою гіпервідповідальною старостою, а ти зберіг свої нерви і вільний час.",
        effects: { hp: 15, xp: 0, cof: 0, rep: 5 },
        next: "END",
      },
      {
        text: "🙈 Сховатись під парту від візуального контакту",
        result:
          "Старостою обрали Богдана. Тепер у групи хаос з розкладом, а довідки губляться швидше, ніж друкуються.",
        effects: { hp: -20, xp: 0, cof: 0, rep: -10 },
        next: "END",
      },
    ],
  },
};

const questSessions = {};

const startQuest = (ctx) => {
  const userId = ctx.from.id;
  questSessions[userId] = {
    currentSceneId: "cw_deadline",
    stats: { hp: 100, xp: 0, cof: 3, rep: 50 },
    history: "",
  };
  sendQuestStep(ctx, userId, true);
};

bot.hears("🎮 Квест: ІПЗ", startQuest);
bot.command("game", startQuest);
bot.action("menu_game", (ctx) => {
  ctx.answerCbQuery();
  startQuest(ctx);
});

const sendQuestStep = (ctx, userId, isFirst = false) => {
  const session = questSessions[userId];
  const scene = questScenarios[session.currentSceneId];

  const hud = `<b>[ СТАТУС ]</b>\n❤️ Нерви: <code>${session.stats.hp}/100</code> | 🧠 Знання: <code>${session.stats.xp}</code>\n☕ Кава: <code>${session.stats.cof}</code> | 🤝 Репутація: <code>${session.stats.rep}/100</code>\n\n`;
  const sceneText = `<b>📍 ${scene.chapter} | ${scene.location}</b>\n\n${scene.text}`;
  const fullMessage = session.history + hud + sceneText;

  const buttons = scene.choices.map((choice, index) => [
    Markup.button.callback(choice.text, `rpg_${index}`),
  ]);

  if (isFirst) {
    ctx.reply(fullMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(buttons),
    });
  } else {
    ctx.editMessageText(fullMessage, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(buttons),
    });
  }
};

bot.action(/rpg_([0-9]+)/, (ctx) => {
  const userId = ctx.from.id;
  const session = questSessions[userId];

  if (!session) {
    return ctx.editMessageText(
      '<i>Сесія втрачена в кулуарах деканату. Натисни "🎮 Квест: ІПЗ" ще раз!</i>',
      { parse_mode: "HTML" },
    );
  }

  const choiceIndex = parseInt(ctx.match[1]);
  const currentScene = questScenarios[session.currentSceneId];
  const selectedChoice = currentScene.choices[choiceIndex];

  if (selectedChoice.effects.cof < 0 && session.stats.cof <= 0) {
    return ctx.answerCbQuery(
      "❌ У тебе закінчилась кава! Обери інший варіант.",
      { show_alert: true },
    );
  }

  session.stats.hp += selectedChoice.effects.hp;
  session.stats.xp += selectedChoice.effects.xp;
  session.stats.cof += selectedChoice.effects.cof;
  session.stats.rep += selectedChoice.effects.rep;

  if (session.stats.hp > 100) session.stats.hp = 100;
  if (session.stats.rep > 100) session.stats.rep = 100;
  if (session.stats.rep < 0) session.stats.rep = 0;

  session.history = `<i>👉 ${selectedChoice.result}</i>\n\n`;

  if (session.stats.hp <= 0) {
    session.stats.hp = 0;
    const gameOverHud = `<b>[ СТАТУС ]</b>\n❤️ Нерви: <code>0/100</code> | 🧠 Знання: <code>${session.stats.xp}</code>\n☕ Кава: <code>${session.stats.cof}</code> | 🤝 Репутація: <code>${session.stats.rep}/100</code>\n\n`;

    ctx.editMessageText(
      session.history +
        gameOverHud +
        "<b>💀 GAME OVER: Емоційне вигорання</b>\n\n<i>Твоя нервова система сказала 'До побачення'. Комп'ютер завис, а ти пішов спати на 3 доби. ІПЗ не прощає помилок! Спробуй ще раз.</i>",
      { parse_mode: "HTML" },
    );
    delete questSessions[userId];
    return;
  }

  session.currentSceneId = selectedChoice.next;

  if (
    session.currentSceneId === "END" ||
    !questScenarios[session.currentSceneId]
  ) {
    const victoryHud = `<b>[ ФІНАЛЬНИЙ СТАТУС ]</b>\n❤️ Нерви: <code>${session.stats.hp}/100</code> | 🧠 Знання: <code>${session.stats.xp}</code>\n☕ Кава: <code>${session.stats.cof}</code> | 🤝 Репутація: <code>${session.stats.rep}/100</code>\n\n`;

    ctx.editMessageText(
      session.history +
        victoryHud +
        "<b>🏆 КВЕСТ ПРОЙДЕНО!</b>\n\n<i>Ти вижив в джунглях ІПЗ! Тепер тобі не страшні ні дедлайни, ні Андрусяк і Левус, ні відключення світла. З таким набором скілів та нервів — ти ідеальний кандидат на IT Responsible!</i>",
      { parse_mode: "HTML" },
    );
    delete questSessions[userId];
  } else {
    sendQuestStep(ctx, userId);
  }
});

// --- БЛОК: МАТРИЦЯ ДОЛІ ---
const predictions = [
  "✨ Твій день сьогодні пройде максимально гладко! Аура дня має колір гарного заходу сонця. Очікуй раптового натхнення та ідеального балансу між роботою і відпочинком.",
  "⚠️ Обережно: сьогодні висока ймовірність зловити баг у комунікації. Зірки радять тримати дистанцію від токсичних людей, не сперечатися і пити більше теплого чаю.",
  "🍀 Матриця твого дня ідеально збалансована. Чудовий час, щоб закрити старі хвости, відкласти ноутбук і нарешті виділити вечір на прогулянку з близькою людиною.",
  "🔮 Сьогодні ти — Орієнтований Граф. Чітко знаєш куди йдеш, маєш мету і не повертаєшся до колишніх проблем. Ідеальний настрій для великих звершень для BTW!",
  "🌪 Відчуваєш, що бігаєш по колу? Зроби паузу. Випий води, послухай улюблену музику (може, щось акустичне або драйвове?) і видихни. Найкращі ідеї приходять у тиші.",
  "🧩 Сьогодні твій день схожий на складну систему рівнянь. Збоку виглядає заплутано, але якщо розкласти все по поличках, рішення виявиться геніально простим.",
  "🔥 Motivation.Goal сьогодні на рівні 1000%. Навіть якщо все йде не за планом, ти зможеш вирулити будь-яку ситуацію просто силою своєї харизми.",
  "🏔 Сьогодні зірки радять мислити глобально. Уяви себе десь у горах з друзями: дедлайни здаються дрібними, а повітря — чистим. Ідеальний день для планування майбутнього.",
  "☕️ Твоя суперсила сьогодні — знаходити спільну мову з ким завгодно. Навіть із найсуворішим викладачем чи дуже впертим таском. Користуйся цим!",
  "✨ День обіцяє бути дуже естетичним. Навколо тебе створюється справжній кінематографічний вайб. Лови момент, насолоджуйся процесом і не забувай робити класні фото!",
];

bot.hears("🔮 Матриця Долі", (ctx) => {
  const randomIndex = Math.floor(Math.random() * predictions.length);
  const randomPrediction = predictions[randomIndex];
  ctx.reply(
    `<b>Компілюю твоє передбачення...</b> ⏳\n\n<i>${randomPrediction}</i>`,
    { parse_mode: "HTML" },
  );
});

bot.command("tarot", (ctx) => {
  const randomIndex = Math.floor(Math.random() * predictions.length);
  const randomPrediction = predictions[randomIndex];
  ctx.reply(
    `<b>Компілюю твоє передбачення...</b> ⏳\n\n<i>${randomPrediction}</i>`,
    { parse_mode: "HTML" },
  );
});

bot.action("menu_tarot", (ctx) => {
  ctx.answerCbQuery();
  const randomIndex = Math.floor(Math.random() * predictions.length);
  const randomPrediction = predictions[randomIndex];
  ctx.reply(
    `<b>Компілюю твоє передбачення...</b> ⏳\n\n<i>${randomPrediction}</i>`,
    { parse_mode: "HTML" },
  );
});

// --- БЛОК: ТЕСТ "ТВІЙ BEST-ІВЕНТ" ---
const quizQuestions = [
  {
    question: "Питання 1/7: Осіння депресія близько. Чим будеш рятуватися?",
    options: [
      { text: "Піду на вулицю роздавати перехожим мандаринки", type: "fair" },
      {
        text: "Куплю 10 метрів гірлянди і загорнуся в неї під інді-музику",
        type: "btw",
      },
      { text: "Почну збирати кастомну світильню з радіодеталей", type: "ebec" },
      {
        text: "Забуду про депресію, бо все зламалося і треба терміново фіксити",
        type: "hack",
      },
    ],
  },
  {
    question:
      "Питання 2/7: Якби ти міг телепортуватися будь-куди прямо зараз на 10 хвилин, куди б це було?",
    options: [
      {
        text: "На дах хмарочоса в Токіо, щоб зробити кіберпанк-фото",
        type: "btw",
      },
      {
        text: "В середину чорної діри — цікаво ж, що там з фізикою!",
        type: "hack",
      },
      { text: "На найближчий концерт невідомого гурту", type: "fair" },
      {
        text: "На завод IKEA, щоб подивитися, як вони так ідеально пакують меблі",
        type: "ebec",
      },
    ],
  },
  {
    question: "Питання 3/7: Обери свою тотемну тварину на сьогодні:",
    options: [
      {
        text: "Єнот-полоскун (робить якусь дичину, але виглядає впевнено)",
        type: "hack",
      },
      {
        text: "Бобер (будує греблі з усього, що знайшов під рукою)",
        type: "ebec",
      },
      {
        text: "Капібара (на максимальному розслабоні посеред хаосу)",
        type: "fair",
      },
      {
        text: "Медуза (просто пливе за течією і гарно світиться)",
        type: "btw",
      },
    ],
  },
  {
    question: "Питання 4/7: Ти знайшов робочу машину часу. Твої дії?",
    options: [
      {
        text: "Здам її на метал, а на виручені гроші куплю щось корисне",
        type: "ebec",
      },
      {
        text: "Відправлюся в Середньовіччя і відкрию там перший бар",
        type: "fair",
      },
      {
        text: "Полечу в 80-ті, щоб скупити оригінальні вінтажні речі",
        type: "btw",
      },
      {
        text: 'Відмотаю час на 5 хвилин назад, щоб не тиснути "Оновити Windows"',
        type: "hack",
      },
    ],
  },
  {
    question:
      "Питання 5/7: Що ти обереш на свою останню вечерю перед кінцем світу?",
    options: [
      {
        text: "Замовлю піцу з ананасами, щоб остаточно розізлити італійців",
        type: "fair",
      },
      { text: "Зварю пельмені в чайнику — класика не вмирає", type: "ebec" },
      { text: "З'їм сиру цибулину, бо гірше вже точно не буде", type: "hack" },
      { text: "Естетичний матча-лате з круасаном при свічках", type: "btw" },
    ],
  },
  {
    question: "Питання 6/7: Яку максимально безглузду суперсилу ти б обрав?",
    options: [
      {
        text: "Силою думки змінювати колір неба під свій настрій",
        type: "btw",
      },
      {
        text: "Ніколи не кліпати очима, щоб не пропускати жодного кадру життя",
        type: "hack",
      },
      {
        text: "Знати всі анекдоти світу, але забувати їх під час розповіді",
        type: "fair",
      },
      {
        text: "Завжди вгадувати точний час (але з похибкою в 3 хвилини)",
        type: "ebec",
      },
    ],
  },
  {
    question:
      "Питання 7/7: Інопланетяни вимагають показати їм щось одне, щоб не знищувати Землю.",
    options: [
      { text: "Покажу відео, де кіт їде на роботі-пилососі", type: "hack" },
      { text: "Просто обійму їх. Раптом вони дуже самотні?", type: "fair" },
      {
        text: "Креслення панельки на Сихові — хай спробують розібратися",
        type: "ebec",
      },
      { text: "Захід сонця з вікна Львівської політехніки", type: "btw" },
    ],
  },
];

const userSessions = {};

const startQuiz = (ctx) => {
  const userId = ctx.from.id;
  userSessions[userId] = {
    currentQuestion: 0,
    scores: { ebec: 0, hack: 0, btw: 0, fair: 0 },
  };
  sendQuestion(ctx, userId);
};

bot.hears("🏆 Твій BEST-івент", startQuiz);
bot.command("best_event", startQuiz);
bot.action("menu_best", (ctx) => {
  ctx.answerCbQuery();
  startQuiz(ctx);
});

const sendQuestion = (ctx, userId) => {
  const session = userSessions[userId];
  const questionData = quizQuestions[session.currentQuestion];

  const buttons = questionData.options.map((opt) => [
    Markup.button.callback(opt.text, `quiz_${opt.type}`),
  ]);

  const messageText = `<b>${questionData.question}</b>`;

  if (session.currentQuestion === 0) {
    ctx.reply(messageText, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(buttons),
    });
  } else {
    ctx.editMessageText(messageText, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard(buttons),
    });
  }
};

bot.action(/quiz_(ebec|hack|btw|fair)/, (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];

  if (!session) {
    return ctx.editMessageText(
      '<i>Ой, сесія скинулася. Натисни "🏆 Твій BEST-івент" ще раз!</i>',
      { parse_mode: "HTML" },
    );
  }

  const answerType = ctx.match[1];
  session.scores[answerType] += 1;
  session.currentQuestion += 1;

  if (session.currentQuestion < quizQuestions.length) {
    sendQuestion(ctx, userId);
  } else {
    showQuizResult(ctx, userId);
  }
});

const showQuizResult = (ctx, userId) => {
  const scores = userSessions[userId].scores;
  const topEvent = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b,
  );

  let resultText = "<b>Аналіз завершено!</b> 📊\n\n";

  if (topEvent === "ebec") {
    resultText +=
      "⚙️ Твій вайб — <b>BEST Engineering Competition</b>!\n\n<i>Ти справжній творець. У симуляції чи в реальності — ти завжди знайдеш спосіб зібрати робочий механізм із хаосу.</i>";
  } else if (topEvent === "hack") {
    resultText +=
      "👾 Твій вайб — <b>BEST::HACKath0n</b>!\n\n<i>Ти хакер свого життя. Нескінченні цикли, баги і безсонні ночі тебе не лякають, а лише додають драйву.</i>";
  } else if (topEvent === "btw") {
    resultText +=
      "💅 Твій вайб — <b>BEST Training Week</b>!\n\n<i>Естетика, логіка і дзен. Ти знаєш, як зробити складнопідрядні процеси красивими і комфортними для всіх. (Спойлер: це мій улюблений результат 😉)</i>";
  } else if (topEvent === "fair") {
    resultText +=
      "💼 Твій вайб — <b>Інженерний Ярмарок Кар’єри</b>!\n\n<i>Ти майстер нетворкінгу. Здатен домовитися з ким завгодно і перетворити порожню кімнату на центр крутих можливостей.</i>";
  }

  ctx.editMessageText(resultText, { parse_mode: "HTML" });
  delete userSessions[userId];
};

// Запуск бота
bot.launch();
console.log("Бот успішно оновлений і готовий до роботи! 🚀");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
