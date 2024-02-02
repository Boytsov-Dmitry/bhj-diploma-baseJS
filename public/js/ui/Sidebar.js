/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const buttonToggle = document.querySelector('.sidebar-toggle');
    const sideBarMini = document.querySelector('.sidebar-mini');

    buttonToggle.addEventListener('click', (e) => {
      e.preventDefault();

      sideBarMini.classList.toggle('sidebar-open');
      sideBarMini.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const enterButton = document.querySelector('.menu-item_login');
    const registrationButton = document.querySelector('.menu-item_register');
    const exitButton = document.querySelector('.menu-item_logout');

    enterButton.addEventListener('click', (e) => {
      e.preventDefault();

      let classes = enterButton.className.split(' ');
      let typeOfButton = classes.find(elem => elem.includes('menu-item_')).substring(10);

      App.getModal(typeOfButton).open();
    });

    registrationButton.addEventListener('click', (e) => {
      e.preventDefault();

      let classes = registrationButton.className.split(' ');
      let typeOfButton = classes.find(elem => elem.includes('menu-item_')).substring(10);

      App.getModal(typeOfButton).open();
    });

    exitButton.addEventListener('click', (e) => {
      e.preventDefault();

      User.logout((err, response) => {
        if(err) {
          alert('ошибка выхода')
        };

        App.setState('init');
      });
    });
  };
};