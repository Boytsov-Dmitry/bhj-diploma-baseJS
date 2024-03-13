/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.update()

    if(this.element === undefined) {
      alert('передан пустой AccountsWidget')
    };
  };

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAcc = document.querySelector('.create-account');
    const panel = document.querySelector('.accounts-panel');

    createAcc.addEventListener('click', () => {
      App.getModal();
      
    })

    panel.addEventListener('click', (e) => {
      let accCheck = Array.from(document.getElementsByClassName('account'));

      if(e.target.closest('.create-account') === createAcc) {
        App.getModal('createAccount').open();
      };

      for(let i = 0; i < accCheck.length; i++) {
        if (e.target.closest('.account') === accCheck[i]) {
          e.preventDefault();
          this.onSelectAccount(accCheck[i]);
        };
      };
    });
  }''

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const authUser = User.current();


    if (authUser !== null) {
      Account.list(authUser, ( err, response ) => {
        if (err) {
          alert('передан не верный Account.list');
        };

        this.clear();

        if(response) {
          response.data.forEach(e => {
            this.renderItem(e);             
          }); 
        }
      });
    };
  };

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accCheck = Array.from(document.getElementsByClassName('account'));
    
    for(let i = 0; i < accCheck.length; i++) {
      e.remove(accCheck[i]);
    };
  };

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if (!element.classList.contains('active')) {
      const currentAcc = document.querySelector('.active');
      
      if (currentAcc) {
        currentAcc.classList.remove('active');
      };                                    
      element.classList.add('active');
    };

    App.showPage( 'transactions', {account_id: element.dataset.id});
  };

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id=${item.id}>
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum}</span>
              </a>
            </li>`;
  };

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    let accHtml = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeEnd', accHtml);
  };
};
