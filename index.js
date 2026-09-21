// Ждем полной загрузки структуры DOM-дерева, чтобы элементы точно существовали на странице
document.addEventListener("DOMContentLoaded", () => {
  // Находим кнопку переключения темы по БЭМ-классу
  const themeSwitchBtn = document.querySelector(".header__theme-switch");

  /**
   * Функция определяет, какую тему применить при первом заходе пользователя.
   * Приоритет: 1. Выбор из localStorage -> 2. Системные настройки ОС -> 3. 'light' по умолчанию
   */
  const getInitialTheme = () => {
    // 1. Проверяем, сохранил ли пользователь тему ранее в локальном хранилище браузера
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme; // Если значение есть ('dark' или 'light'), возвращаем его
    }

    // 2. Если в localStorage ничего нет, проверяем системную тему операционной системы (prefers-color-scheme)
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Если в системе включена тёмная тема — возвращаем 'dark', иначе 'light'
    return prefersDark ? "dark" : "light";
  };

  /**
   * Функция устанавливает тему на страницу и сохраняет выбор пользователя.
   * @param {string} theme - Название темы ('light' или 'dark')
   */
  const setTheme = (theme) => {
    // Добавляем или обновляем атрибут data-theme на корневом теге <html> (document.documentElement)
    // В CSS правила [data-theme="dark"] сразу применят новые значения переменных
    document.documentElement.setAttribute("data-theme", theme);

    // Сохраняем текущий выбор в localStorage, чтобы тема не сбрасывалась при перезагрузке страницы
    localStorage.setItem("theme", theme);
  };

  // --- Инициализация при загрузке страницы ---
  // Получаем тему по алгоритму из getInitialTheme() и применяем её
  setTheme(getInitialTheme());

  // --- Обработка клика по кнопке ---
  // Проверяем, существует ли кнопка на странице (защита от ошибок, если скрипт подключен везде)
  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener("click", () => {
      // Считываем текущее значение атрибута data-theme с тега <html>
      const currentTheme = document.documentElement.getAttribute("data-theme");

      // Определяем противоположную тему (если была 'dark' — ставим 'light', и наоборот)
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      // Применяем новую тему и обновляем запись в localStorage
      setTheme(newTheme);
    });
  }
});
