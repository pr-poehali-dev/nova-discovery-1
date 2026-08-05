import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
          Политика конфиденциальности
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Дата последнего обновления: 5 августа 2026 г.
        </p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">1. Общие положения</h2>
            <p>
              Настоящая политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сайта компании «ЭкспоМаксГрупп» (далее — «Компания»).
              Используя сайт, вы соглашаетесь с условиями настоящей политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">2. Какие данные мы собираем</h2>
            <p>
              Мы можем собирать следующие данные: имя, номер телефона, адрес электронной почты —
              при заполнении форм обратной связи, а также обезличенные технические данные
              (файлы cookie, IP-адрес, тип браузера) для анализа посещаемости сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">3. Использование файлов cookie</h2>
            <p>
              Сайт использует файлы cookie для корректной работы, запоминания ваших предпочтений
              и улучшения пользовательского опыта. Вы можете отключить cookie в настройках браузера,
              однако это может повлиять на работу отдельных функций сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">4. Цели обработки данных</h2>
            <p>
              Персональные данные используются исключительно для обратной связи с пользователем,
              расчёта стоимости услуг, отправки коммерческих предложений и улучшения работы сайта.
              Компания не передаёт данные третьим лицам без согласия пользователя, за исключением
              случаев, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">5. Хранение и защита данных</h2>
            <p>
              Компания принимает необходимые организационные и технические меры для защиты
              персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">6. Права пользователя</h2>
            <p>
              Вы вправе запросить информацию об обрабатываемых данных, потребовать их изменения
              или удаления, а также отозвать согласие на обработку персональных данных, связавшись
              с нами по контактам, указанным ниже.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-2">7. Контакты</h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, вы можете связаться
              с нами по телефону:{" "}
              <a href="tel:+79259442855" className="text-foreground underline">
                +7 925 944 28 55
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
