var user = {
    name: 'Пользователь',
    date: new Date()
};
//var user = null;
var isAdd = false;
var start = 0;
var filterConfig = {
    author: "",
    createdAt: "",
    tags: []
};

var GLOBAL_ARTICLES = [
    {
        id: '1',
        title: '"Не получается купить проект". Город скорректировал подход к постройке футбольного стадиона',
        createdAt: new Date('2017-02-27T23:00:00'),
        summary: 'Подход к строительству Национального футбольного стадиона возле площади Ванеева снова корректируют. Вместо покупки проекта уже возведенной в Европе арены городские власти рассматривают вариант реализации всех стадий строительства собственными силами. Такой вывод можно сделать по итогами беседы TUT.BY с главой Минска Андреем Шорцем.',
        author: 'Станислав',
        content: 'Напомним, в прошлом году городские власти отказались от услуг китайской компании, которая должна была построить Национальный футбольный стадион рядом с существующим «Трактором». Тогда решили купить проект арены, которая уже работает в одной из европейских стран, и возвести ее за средства бюджета и Банка развития.Андрей Шорец говорит, что после этого они изучили несколько вариантов, включая стадион в Будапеште и домашнюю арену варшавской «Легии». ',
        tag: ['Строительство', 'Спорт']
    },
    {
        id: '2',
        title: 'В Минской области сотрудникам ГАИ пришлось стрелять по колесам двух автомобилей для остановки нарушителей',
        summary: 'В Минской области сотрудники ГАИ вынуждены были 2 и 3 марта стрелять по колесам автомобилей для остановки нарушителей, сообщили в УГАИ УВД Миноблисполкома.',
        createdAt: new Date('2017-03-03T14:00:00'),
        author: 'Дмитрий',
        content: 'Первый инцидент случился 2 марта около 19.20 на автодороге вблизи деревни Гольчицы Слуцкого района. Внимание сотрудников ОГАИ Слуцкого РОВД привлек автомобиль Toyota Camry, двигавшийся с неработающими фарами и без переднего регистрационного знака. Водитель Toyota попытался скрыться от ГАИ.Следует отметить, что водитель игнорировал многократные требования ГАИ об остановке, сирену и сигналы маячков красно-синего цвета. Не остановили его и предупредительные выстрелы в воздух. После этого сотрудником ГАИ были произведены прицельные выстрелы по колесам транспортного средства. Даже два простреленных задних колеса не образумили нарушителя — машина еще около километра продолжала движение на дисках колес без резины. Удалось задержать нарушителя на 65-м км автодороги Р-91. За рулем находился 42-летний местный житель в состоянии сильного алкогольного опьянения (3,2 промилле). С 2008 года он четырежды привлекался за управление транспортным средством в нетрезвом состоянии, в том числе в последний раз — в 2015 году.',
        tag: ['Проишествия', 'Авто']
    },
    {
        id: '3',
        title: 'В Литве установят сирены на случай чрезвычайных ситуаций на БелАЭС ',
        summary: 'Департамент пожарной безопасности и спасения (ДПБС) намерен оборудовать на юго-востоке Литвы предупредительные сирены, которые бы информировали население о возможной опасности в случае инцидентов на Островецкой АЭС в Беларуси,',
        createdAt: new Date('2017-02-15T14:00:00'),
        author: 'Владимир',
        content: 'Сирены собираются установить в Вильнюсе и Вильнюсском районе, Ширвинтском и Шальчининкском районах, всего в 150 местах, которые находятся от АЭС примерно в 50 километрах./nПо словам заместителя директора ДПБС Юриса Таргонскаса, сирены обойдутся в сумму до трех миллионов евро./n«Когда еще работала Игналинская атомная станция, у нас также вокруг была внедрена система предупреждения. Поскольку АЭС будет находиться недалеко от границы, зона воздействия будет на нашей территории, мы готовимся предупредить жителей», — сообщил он./nТаргонскас подчеркнул, что жителей будут предупреждать как в связи с радиоактивной опасностью, так и в случаях других происшествий. Сирены будут интегрированы в общую систему предупреждения, информирующую жителей телефонными сообщениями, если нужно — и через национальный транслятор./nВ департаменте надеются, что сирены появятся еще до запуска БелАЭС./nБелорусская АЭС строится по проекту АЭС-2006 с реакторами типа ВВЭР-1200. Стройплощадка находится в 18 км от Островца в Гродненской области в 50 километрах от столицы Литвы. АЭС будет состоять из двух энергоблоков суммарной мощностью до 2400 (2?1200) МВт. Первый энергоблок планируется ввести в эксплуатацию в 2019 году, второй — в 2020-м. Правительство Литвы утверждает, что БелАЭС возводится с нарушениями стандартов безопасности. Минск эти упреки отвергает.',
        tag: ['Беларусь', 'Литва']
    },
    {
        id: '4',
        title: 'Минтруда: в Беларуси пересмотрят назначение и выплату пособий на детей-инвалидов',
        summary: 'Система назначения и выплат пособий в Беларуси будет усовершенствована, сообщил на пресс-конференции заместитель министра труда и социальной защиты Александр Румак, передает БелаПАН.',
        createdAt: new Date('2017-03-06T11:15:00'),
        author: 'Иванов Иван',
        content: 'По его словам, подготовлен в новой редакции проект закона «О государственных пособиях семьям, воспитывающим детей». Документ был принят в первом чтении и сейчас готовится ко второму чтению в Палате представителей Национального собрания.\nКак заявил замминистра, новой редакцией предусматриваются определенные меры усиления социальной поддержки семей, воспитывающих детей-инвалидов.\n— В частности документ дает возможность родителям, осуществляющим уход за детьми-инвалидами, работать на 0,5 ставки с сохранением пособия по уходу, — пояснил Александр Румак.\nСейчас право на такое пособие имеют неработающие и не получающие пенсии мать, отец, усыновитель (удочеритель), опекун, попечитель или другое лицо, фактически осуществляющее уход за ребенком-инвалидом. Кроме того, пособие по уходу за ребенком-инвалидом в возрасте до 18 лет могут также получать мать, отец, усыновитель (удочеритель), опекун, попечитель, находящиеся в отпуске по уходу за ребенком до достижения им возраста 3 лет. Предполагается, что после вступления изменений в силу родители детей-инвалидов сохранят право на пособие при выходе на работу не более чем на 0,5 ставки или при работе на дому.\nАлександр Румак также рассказал, что семьям, в которых воспитываются дети с 3-й и 4-й степенями утраты здоровья, будут увеличены пособия. Представитель Минтруда отметил, что количество семей, воспитывающих двух и более детей, в Беларуси продолжает расти. «На сегодня 57,2% рожденных детей являются вторыми или последующими», — сказал он, добавив, что всего в центрах социального обслуживания находятся на учете 88,5 тысячи многодетных семей.',
        tag: ['Беларусь', 'Экономика']
    },
    {
        id: '5',
        title: 'В России создали лекарство от всех видов рака',
        summary: 'Российские СМИ сообщили о завершении доклинических испытаний лекарства, которой способно совершить революцию в онкологии.',
        createdAt: new Date('2017-02-28T11:55:00'),
        author: 'Виталий Олехнович',
        content: 'Лекарство удалось получить с помощью биотехнологий и эксперимента на МКС в 2015 году по выращиванию ' +
        'сверхчистого кристалла. Лекарство было опробовано на мышах и крысах, у которых развивались меланомы и саркомы.' +
        'Пациентам оно станет доступно через три-четыре года, пока пройдут все доклинические испытания.' +
        'Впрочем, многое будет зависеть от финансирования программы.',
        tag: ['Россия', 'Наука']
    },
    {
        id: '6',
        title: 'Самые ожидаемые игры весны 2017 года',
        summary: 'Прошедшей зимой вышло не так уж много действительно интересных и громких проектов.' +
        'Некоторые из игр вызвали разочарование, другие в целом оправдали ожидания.',
        createdAt: new Date('2017-02-28T11:55:00+03:00'),
        author: 'Onliner.by',
        content: 'The Last Guardian оказалась неплохим приключением (хоть и скучным) и привлекла к себе внимание, ' +
        'кроме прочего, тем, что в разработке она находилась долгие девять лет. Resident Evil 7: Biohazard ' +
        'восприняли кто как: некоторым страшилка показалась неканоничной, другим — свежей и интересной.',
        tag: ['Культура']
    },
    {
        id: "7",
        title: "Bloomberg представил топ-500 богатейших людей планеты. Белорусов среди них пока нет",
        summary: " Самый богатый белорус - это 40-летний создатель онлайн-игры World of Tanks Виктор Кислый",
        createdAt: new Date("2017-02-28T11:55:00"),
        author: "Дмитрий",
        content: "В феврале 2016-го пополнил список долларовых миллиардеров Bloomberg, но пока «отстает» от замыкающего " +
        "топ-500 96-летнего миллиардера из Саудовской Аравии Сулеймана аль Раджи более чем на 2 млрд долларов." +
        "Возглавил рейтинг основатель Microsoft Билл Гейтс (85,6 млрд долларов), на втором месте — американский бизнесмен " +
        "Уоррен Баффет (78,9 млрд), на третьем — глава Amazon Джефф Безос (73,5 млрд).",
        tag: ['Экономика']
    },
    {
        id: "8",
        title: "Российский хоккеист НХЛ хитро реализовал буллит без броска",
        summary: "Российский форвард «Тампы» Никита Кучеров принес победу своей команде в поединке против «Баффало», " +
        "хитро реализовав послематчевый буллит. Ему удалось отправить шайбу в сетку, даже не исполнив броска.",
        createdAt: new Date("2017-03-02T12:55:00"),
        author: "Станислав",
        content: "Сблизившись с голкипером, Никита Кучеров сделал обманное движение, как будто собираясь переложить шайбу" +
        "на неудобную сторону крюка, но не стал ее касаться, и снаряд неспешно проскользнул в сетку под " +
        "не ожидавшим такого трюка шведским вратарем Робином Ленером.",
        tag: ['Спорт']
    },
    {
        id: "9",
        title: 'Число крытых ледовых арен в Беларуси за 25 лет возросло почти в восемь раз',
        summary: 'Федерация хоккея Беларуси (ФХБ), одного из самых популярных видов спорта, отметила 6 марта четвертьвековой юбилей. За эти годы число крытых ледовых арен возросло почти в восемь раз — с четырех до 31, сообщает корреспондент БЕЛТА.',
        createdAt: new Date("2017-01-02T12:55:00"),
        author: 'Дмитрий',
        content: "Федерация была основана 6 марта 1992 года и является членом Международной федерации хоккея (ИИХФ) с 6 мая 1992-го.\n— Хоккей с шайбой по праву завоевал любовь и признание во всех уголках нашей страны, среди болельщиков разных возрастов и профессий, среди тех, кто беззаветно предан этой великой игре, и тех, кто только делает первые шаги на ледовых площадках, — отметил в своем поздравлении председатель ФХБ Игорь Рачковский.\nПервым председателем федерации был Евгений Анкуда, также ФХБ ранее возглавляли Лев Контарович, Юрий Бородич, Владимир Наумов и Евгений Ворсин.\nСамого значительного успеха за время выступлений на международных турнирах национальная сборная Беларуси добилась в 2002 году, когда заняла четвертое место на зимних Олимпийских играх в Солт-Лейк-Сити.\nВажнейшей вехой в развитии вида спорта стало проведение чемпионата мира в 2014 году, который с успехом прошел на двух ультрасовременных столичных ледовых стадионах — «Чижовка-Арене» и «Минск-Арене».\nТакже Беларусь подала совместную заявку с Латвией на проведение планетарного форума 2021 года.",
        tag: ['Спорт', 'Культура']
    },
    {
        id: "10",
        title: 'Проект "Копенгаген": дом в скандинавском стиле построили под Минском за 118 дней',
        summary: 'Перед архитектором этого дома стояла непростая задача — создать проект в современной стилистике,\nкоторый бы гармонично вписался в довольно узкий, вытянутый в длину участок с большим перепадом высот.\nОн должен быть функциональным, энергосберегающим и экологичным, иметь разумную стоимость и короткие сроки возведения. \nИ обязательно каркасным. И вот через 118 дней от момента начала работ на участке в деревне под Минском появился интересный\nобъект с оригинальным названием «Копенгаген».',
        createdAt: new Date("2017-01-02T13:55:00"),
        author: 'Анна',
        content: "Перед архитектором этого дома стояла непростая задача — создать проект в современной стилистике,\nкоторый бы гармонично вписался в довольно узкий, вытянутый в длину участок с большим перепадом высот.\nОн должен быть функциональным, энергосберегающим и экологичным, иметь разумную стоимость и короткие сроки возведения. \nИ обязательно каркасным. И вот через 118 дней от момента начала работ на участке в деревне под Минском появился интересный\nобъект с оригинальным названием «Копенгаген».",
        tag: ['Культура']
    },
    {
        id: "11",
        title: '"Папулярная навука па-беларуску" запрашае абмеркаваць тэму "Светлавая хваля',
        summary: 'Праект «Папулярная навука па-беларуску» запрашае 27 лютага правесці вечар разам. Новая тэма — «Оптыка. Светлавая хваля і яе прымяненне».Гэтым разам увага будзе скіравана на тлумачэнне звычайных светлавых з’яў, з якімі мы сустракаемся кожны дзень.Будзе прапанавана разабрацца, якую прыроду мае сонечны свет і што значыць «раскласці святло на спектр»а таксама разгледжана шкала электрамагнтных хваляў — дзе там ультарфіялет, а дзе інфрачырвонае выпраменьванне.Нагадаем пра з’явы інтэрферэнцыi і дыфракцыi (яны вывучаліся на мінулых лекцыях) і прадэманструем іх на практыцы.Будуць паказаны эксперыменты з лазерам і не толькі.',
        createdAt: new Date("2017-02-02T19:55:00"),
        author: 'Анна',
        content: ' Праект «Папулярная навука па-беларуску» запрашае 27 лютага правесці вечар разам. Новая тэма — «Оптыка. Светлавая хваля і яе прымяненне».Гэтым разам увага будзе скіравана на тлумачэнне звычайных светлавых з’яў, з якімі мы сустракаемся кожны дзень.Будзе прапанавана разабрацца, якую прыроду мае сонечны свет і што значыць «раскласці святло на спектр»а таксама разгледжана шкала электрамагнтных хваляў — дзе там ультарфіялет, а дзе інфрачырвонае выпраменьванне.Нагадаем пра з’явы інтэрферэнцыi і дыфракцыi (яны вывучаліся на мінулых лекцыях) і прадэманструем іх на практыцы.Будуць паказаны эксперыменты з лазерам і не толькі.',
        tag: ['Культура', 'Наука']
    },
    {
        id: "12",
        title: "В БГЭУ выбрали самую красивую студентку",
        summary: "Традиционно женский нархоз разыграл титул своей самой красивой студентки. " +
        "Пятничным вечером девять девушек сноровисто меняли платья, аккуратно вышагивали на шпильках высотой с небоскреб.",
        createdAt: new Date("2017-02-24T08:00:00"),
        author: "Onliner.by",
        content: " Девушек девять. Они представляют разные факультеты, аббревиатуры которых могут быть понятны только местным." +
        " На сцену выходит Марта Колб с факультета менеджмента. Сразу говорит, что она папина дочка: с 12 лет водит машину " +
        "и умеет забивать гвозди. Все аплодируют ее силе и независимости.В итоге главный приз" +
        " из его рук получила Марта Колб. Девушка настолько не ожидала успеха, что расплакалась прямо как в телевизоре. " +
        "Потом сказала, мол, очень сильно переживала и на репетициях даже лила слезы от перенапряжения." +
        "Девушка родом из Пинска. Пока неизвестно, вернется ли она на Полесье после учебы. Хотя это и неважно.",
        tag: ['Культура', 'Университет']
    },
    {
        id: "13",
        title: "6 марта в Беларуси ожидаются дожди",
        summary: "В Беларуси 6 марта будет облачно с прояснениями, на большей части территории пройдут дожди.",
        createdAt: new Date("2017-02-28T09:00:00"),
        author: "TUT.BY",
        content: " В северных районах страны возможен мокрый снег, слабый гололед, на отдельных участках дорог гололедица.",
        tag: ['Погода']
    },
    {
        id: "14",
        title: "Прыгун в высоту принес Беларуси третью медаль на ЧЕ-2017 по легкой атлетике в помещении ",
        summary: "Белорусский прыгун в высоту 20-летний Павел Селиверстов принес Беларуси третью медаль " +
        "на чемпионате Европы по легкой атлетике в помещении, который проходит в Белграде.+",
        createdAt: new Date("2017-02-25T09:40:00"),
        author: "TUT.BY",
        content: " Лучшим результатом белоруса стала высота 2,27 м, и этого показателя хватило для бронзовой награды.",
        tag: ['Спорт']
    },
    {
        id: "15",
        title: "В Минске прошел торжественный марш подразделений МВД, посвященный 100-летию белорусской милиции",
        summary: "Торжественный марш подразделений Министерства внутренних дел, посвященный 100-летию белорусской милиции," +
        " прошел сегодня в Минске на Октябрьской площади.",
        createdAt: new Date("2017-02-27T18:24:00"),
        author: "Onliner.by",
        content: " Всего в этом мероприятии было задействовано более 1,2 тыс. сотрудников различных подразделений МВД." +
        " Также в параде участвовало 46 единиц техники — современных машин и ретроавтомобилей.",
        tag: ['Культура']
    }
];
var GLOBAL_TAGS = ['Беларусь', 'Литва', 'Россия', 'Украина', 'Латвия', 'Польша', 'Авто', 'Проишествия', 'Спорт', 'Строительство', 'Культура', 'Афиша', 'Политика', 'Экономика', 'Туризм', 'Образование', 'Университет', 'Наука'];
var GLOBAL_AUTHORS = ['Станислав', 'Дмитрий', 'Владимир', 'Иванов Иван', 'Виталий Олехнович', 'Onliner.by', "Станислав", 'Анна', "TUT.BY"];

function getArticle(id) {
    var result = GLOBAL_ARTICLES.filter(function (item) {
        return item.id === id;
    });
    if (result) {
        return result[0];
    }
    return false;
}

function userCheck() {
    var right = document.querySelector('.right_header');
    var sing = document.createElement('button');
    sing.style.display = 'inline-block';
    if (user === null) {
        sing.innerHTML = 'Вход';
        right.appendChild(sing);
        var options = document.querySelectorAll('.tools>.icon');
        for (var i = 0; i < options.length; i++) {
            options[i].style.display = 'none';
        }
        var add = document.querySelectorAll('.left-header>.icon');
        add[1].style.display = 'none';
    }
    else {
        var div = document.createElement('div');
        div.innerHTML = user.name;
        div.style.display = 'inline-block';
        div.style.margin = '10px';
        right.appendChild(div);
        sing.innerHTML = 'Выход';
        right.appendChild(sing);
    }

}
function formSelection() {
    var sel = document.querySelector('select');
    var op = document.createElement('option');
    op.text = "Выберите автора";
    op.value = "";
    sel.appendChild(op);
    GLOBAL_AUTHORS.forEach(function (item) {
        var sel = document.querySelector('select');
        var op = document.createElement('option');
        op.value = item;
        op.text = item;
        sel.appendChild(op);
    });
}
function showArticles(skip=0, top=4, filterConfig='') {

    function createDate(article) {
        var month = article.createdAt.getMonth() + 1;
        return article.createdAt.getDate() + "." + month + "." + article.createdAt.getFullYear();
    }

    function compareDates(firstArg, secondArg) {
        return secondArg.createdAt - firstArg.createdAt;
    }

    function getArticles(skip=0, top=10, filterConfig = '') {
        var result = GLOBAL_ARTICLES;
        if (filterConfig.tags) {
            result = result.filter(function (obj) {
                var flag = filterConfig.tags.every(function (item, index, array) {
                    return obj.tag.join(" ").indexOf(item) != -1;
                });
                return flag;
            });
        }
        if (filterConfig.createdAt)
            result = result.filter(function (obj) {
                var flag = obj.createdAt.getFullYear() === filterConfig.createdAt.getFullYear();
                flag = flag & obj.createdAt.getMonth() === filterConfig.createdAt.getMonth();
                flag = flag & obj.createdAt.getDate() === filterConfig.createdAt.getDate();
                return flag;
            });
        result.sort(compareDates);
        if (filterConfig.author)
            result = result.filter(function (obj) {
                return obj.author.toLowerCase() === filterConfig.author.toLowerCase();
            })
        result = result.slice(skip, skip + top);
        return result;
    }

    var news = document.querySelector(".news");
    if (news) {
        while (news.firstChild) {
            news.removeChild(news.firstChild);
        }
    }
    var articles = getArticles(skip, top, filterConfig);
    for (var i = 0; i < articles.length && i < 4; i++) {
        var tmpl = document.getElementById("holder");
        holder = tmpl.content.cloneNode(true);
        var buttons = holder.querySelectorAll("button>img");
        buttons.forEach(function (item) {
            item.id = articles[i].id;
        });
        var hide = holder.querySelector('.hide');
        var title = hide.querySelector('h2');
        var summary = hide.querySelector('div');
        var tools = holder.querySelector('.tools');
        title.innerHTML = articles[i].title;
        summary.innerHTML = articles[i].summary;
        var author = document.createTextNode("\n" + articles[i].author);
        var date = document.createTextNode(createDate(articles[i]));
        tools.insertBefore(author, tools.firstChild);
        tools.insertBefore(date, tools.firstChild);
        var tags = holder.querySelector('.tegs');
        tags.innerHTML = '<p class="full_article">' + articles[i].tag.join(' ') + '</p>';
        news.appendChild(holder);
    }
}
function removeArticle(id) {

    function getArticlePosition(id) {
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++)
            if (GLOBAL_ARTICLES[i].id == id)
                return i;
        return false;
    }

    function deleteArticle(id) {

        var pos = getArticlePosition(id);
        if (pos === false)
            return false;
        GLOBAL_ARTICLES.splice(pos, 1);
        return true;

    }

    deleteArticle(id);
    showMainPage();
}
function editArticle(id, article) {
    function getArticlePosition(id) {
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++)
            if (GLOBAL_ARTICLES[i].id == id)
                return i;
        return false;
    }

    var pos = getArticlePosition(id);
    if (article.title.length >= 100 || !article.title) {
        return false;
    }
    if (pos === false) {
        return false;
    }
    if (!article.tag.every(function (item) {
            var pos = GLOBAL_TAGS.indexOf(item);
            return pos != -1;
        })) {
        return false;
    }
    if (article.summary.length >= 200 || !article.summary) {
        return false
    }
    if (!article.content) {
        return false;
    }
    GLOBAL_ARTICLES[pos].title = article.title;
    GLOBAL_ARTICLES[pos].summary = article.summary;
    GLOBAL_ARTICLES[pos].content = article.content;
    GLOBAL_ARTICLES[pos].tag = article.tag;

    showMainPage();
    return true;
}
function addArticle(article) {
    function validateArticle(article) {
        if (!getArticle(article.id) || !article.id) {
            return false;
        }
        if (article.title.length >= 100 || !article.title) {
            return false;
        }
        if (article.summary.length >= 200 || !article.summary) {
            return false;
        }
        if (!article.createdAt) {
            return false;
        }
        if (!article.content) {
            return false;
        }
        if (!article.content) {
            return false;
        }
        if (!article.tag.every(function (item) {
                var pos = GLOBAL_TAGS.indexOf(item);
                return pos != -1;
            })) {
            return false;
        }
        return true;
    }

    if (!validateArticle(article)) {
        return false;
    }
    GLOBAL_ARTICLES.push(article);
    return true;
}


function showNext(event) {
    start += 4;
    showArticles(start, 4, filterConfig);
}
function showPrivious(event) {
    if (start < 4)
        return 0;
    start -= 4;
    showArticles(start, 4, filterConfig);
}


function showMainPage() {
    var mainPart = document.querySelector(".main-part");
    mainPart.style.backgroundColor = "rgba(255,255,255,0)"
    while (mainPart.firstChild) {
        mainPart.removeChild(mainPart.firstChild);
    }
    mainPart.appendChild(document.querySelector(".main-page").content.cloneNode(true));
    formSelection();
    var use = document.querySelector(".use");
    use.addEventListener('click', changeFilter);
    var previous = document.querySelectorAll(".new-page")[0];
    var next = document.querySelectorAll(".new-page")[1];

    previous.addEventListener('click', showPrivious);
    next.addEventListener('click', showNext);
    showArticles(start, 4, filterConfig);
}


this.read = function (id) {


    var mainPart = document.querySelector(".main-part");
    while (mainPart.firstChild) {
        mainPart.removeChild(mainPart.firstChild);
    }
    var tmpl = document.querySelector("#read_more");
    mainPart.appendChild(tmpl.content.cloneNode(true));
    mainPart.style.backgroundColor = "rgba(255,255,255,0.7)";
    var article = getArticle(id);
    if (!article) {
        return false;
    }

    var title = document.querySelector('h2');
    title.innerText = article.title;

    var author = document.querySelectorAll('.small');
    author[0].innerText = article.author;
    author[1].innerText = article.createdAt.getDate() + "." + ( article.createdAt.getMonth() + 1 ) + "." + article.createdAt.getFullYear();

    var p = document.querySelector('p.summary');
    p.appendChild(document.createTextNode(article.content));

    var buttons = mainPart.querySelectorAll("button>img");
    buttons.forEach(function (item) {
        item.id = id;
    });
    var toMain = mainPart.querySelector(".to_main");
    toMain.addEventListener('click', showMainPage);
    var div = mainPart.querySelector('div');
    article.tag.forEach(function (item) {
        var t = document.createElement('p');
        t.className = "small";
        t.innerHTML = item;
        div.appendChild(t);
    });

}

this.delete = function (id) {
    removeArticle(id);
}
var self = this;

this.change = function(id){
    var event;
    showAdd(event, id)
}

function workWithArticles(event) {
    // var target = event.target;
    var action = event.target.getAttribute('data-action');
    var id = event.target.id;
    if (action) {
        self[action](id);
    }
}

function cleanFiterConfig(event) {
    filterConfig.author = "";
    filterConfig.createdAt = "";
    filterConfig.tags = [];
}

function changeFilter(event) {
    cleanFiterConfig(event);
    var u = document.querySelector(".author");
    filterConfig.author = u.options[u.selectedIndex].value;
    u = document.querySelector(".date");
    if (u.value) {
        filterConfig.createdAt = new Date(u.value);
    }
    else {
        filterConfig.createdAt = "";
    }
    start = 0;
    var tags = document.querySelectorAll(".checkbox");
    tags.forEach(function (item) {
        if (item.checked) {
            filterConfig.tags.push(item.value);
        }
    });
    showArticles(start, 4, filterConfig);
}

function showTags(event) {

    function cleanBorder(event) {
        var place = document.querySelector(".border");
        while (place.firstChild) {
            place.removeChild(place.firstChild);
        }
        place.style.backgroundColor = "rgba(255,255,255,0)";
    }

    var place = document.querySelector(".border");
    if (place.firstChild) {
        cleanBorder('click');
        return;
    }
    place.style.backgroundColor = "rgba(255,255,255,0.7)";
    var but = document.createElement('button');
    but.innerHTML = "Скрыть";
    but.className = "hide_tags";
    but.addEventListener('click', cleanBorder);
    place.appendChild(but);
    GLOBAL_TAGS.forEach(function (item) {
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.id = item;
        checkBox.value = item;
        var label = document.createElement("label");
        label.htmlFor = item;
        label.innerHTML = item;
        var div = document.createElement("div");
        div.appendChild(checkBox);
        div.appendChild(label);
        place.appendChild(div);
    });
}



function showAdd(event, ID="") {

    var mainPart = document.querySelector(".main-part");
    mainPart.style.backgroundColor = "rgba(255,255,255,0)"
    while (mainPart.firstChild) {
        mainPart.removeChild(mainPart.firstChild);
    }
    mainPart.appendChild(document.querySelector(".add").content.cloneNode(true));
    var edit = document.querySelector(".edit");
    var title = document.createElement('div');
    var date = document.createElement('div');
    date.className = "user_information";
    title.className = "user_information";
    var tags = document.querySelector(".add_tags");
    GLOBAL_TAGS.forEach(function (item) {
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.id = item;
        checkBox.value = item;
        var label = document.createElement("label");
        label.htmlFor = item;
        label.innerText = item;
        var div = document.createElement("div");
        div.style.display = "inline-block";
        div.appendChild(checkBox);
        div.appendChild(label);
        tags.appendChild(div);
    });
    if(!ID) {
        isAdd = true;
        var article = {
            tag: []
        }
         ID = String(GLOBAL_ARTICLES.length+1);
        title.innerText = user.name;
        date.innerText = user.date.getDate() + "." + ( user.date.getMonth() + 1 ) + "." + user.date.getFullYear();

    }
    else{
        isAdd = false;
        article = getArticle(ID);
        document.querySelector("#title").value = article.title;
        document.querySelector("#summary").value = article.summary;
        document.querySelector("#content").value = article.content;
        title.innerText = article.author;
        date.innerText = article.createdAt.getDate() + "." + ( article.createdAt.getMonth() + 1 ) + "." + article.createdAt.getFullYear();
 tags = document.querySelectorAll("input");
 tags.forEach(function(item){
     if(article.tag.join(' ').includes(item.value))
     {
         item.checked  = true;
     }
 });
    }
    function saveArticle(event,flag) {

        article.title = document.querySelector("#title").value;
        article.summary = document.querySelector("#summary").value;
        article.content = document.querySelector("#content").value;
        article.id = ID;
        article.tag = [];
        var tags = document.querySelectorAll("input");
        tags.forEach(function (item) {
            if (item.checked) {
                article.tag.push(item.value);
            }
        })
        if(isAdd) {
            article.author = user.name;
            article.createdAt = user.date;
            addArticle(article);
        }
        else{
            editArticle(ID,article);
        }
        showMainPage();

    }

    var id = document.createElement('div');

    id.innerText = "ID: " + ID;
    id.className = "user_information";
    edit.insertBefore(id, edit.firstChild);
    edit.insertBefore(date, edit.firstChild);
    edit.insertBefore(title, edit.firstChild);




    var add = document.querySelector(".to_main");
    add.addEventListener('click', saveArticle);

}


userCheck();

showMainPage();

var articleList = document.querySelector(".main-part");
articleList.addEventListener('click', workWithArticles);

var tmp = document.querySelector(".tags");
tmp.addEventListener('click', showTags);

tmp = document.querySelector("header>div>button>img");
tmp.addEventListener('click', showAdd);
