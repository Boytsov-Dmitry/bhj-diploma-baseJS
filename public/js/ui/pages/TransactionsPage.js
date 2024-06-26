/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
      this.element = element;
      this.lastOptions = '';
      this.registerEvents();

      // if(this.element === undefined) {
      //   alert('счет не существует');
      // };
    };

    get element() {
      return this._element;
    };
  
    set element(value) {
      if (!value) {
        alert('счет не существует');
      } else {
        this._element = value;
      };
    };


  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  };

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeActivity = document.querySelector('.remove-account');
    
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      let removeButtons = Array.from(document.getElementsByClassName('transaction__remove'));

      if (e.target.closest('.remove-account') === removeActivity) {
        this.removeAccount();
      }

      for (let item of removeButtons) {
        if (e.target.closest('.transaction__remove') === item) {
          this.removeTransaction(item.dataset.id);    
        }
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.option === '') {
      return;
    };

    let question = confirm("Хотите удалить счет?");
    if (question) {
      Account.remove({ id: this.lastOptions.account_id }, ( err, responseRemove ) => {
        if (err) {
          alert('не правильно передан Account.remove');
        };

        if (responseRemove.success) {
          this.clear(); 
          App.updateWidgets();
          App.updateForms();
        };
      });
    };
  };

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    let question = confirm("Хотите удалить транзакцию?");

    if (question) {
      Transaction.remove({ id: id }, ( err, responseRemove ) => {
        if (err) {
          alert('не правильно передан Transaction.remove')
        };
  
        if (responseRemove.success) {
          App.update();
        };
      });
    };
  };

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (!options) {
      return;
    };

    this.lastOptions = options;

    Account.get(options.account_id, ( err, responseGet ) => {
      if (err) {
        alert('не правильно передан Account.get')
      };

      if (responseGet) {
        this.renderTitle(responseGet.data.name);
      }

      // this.renderTitle(responseGet.data.name);

      Transaction.list({ account_id: responseGet.data.id }, ( err, responseList ) => {
          if(err){
            alert('ошибка в списке транзакций');
          };

          if(responseList){
            this.renderTransactions(responseList.data);
          };
      });
    });
  };

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const contentTitle = document.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){

    let dateForParse;

    if (!date.includes('T')) {
      let dateComponents = date.split(' ');
      dateForParse = dateComponents[0] + 'T' + dateComponents[1];
    } else {
      dateForParse = date.split('.')[0];
    }
    
    let dateObject = new Date(dateForParse);

    let dateFormat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    
    return dateObject.toLocaleString("ru", dateFormat); 
    // date = new Date(date)

    // let day = date.getDate();
    // let month = date.toLocaleString('ru', { month: 'long' });
    // let year = getFullYear();
    // let hour = getHours();
    // let minutes = getMinutes();

    // console.log((`${day} ${month} ${year} г. в ${hour} ${minutes}`));
    
  };

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let newDate = this.formatDate(item.created_at);

    return `<div class="transaction transaction_${item.type} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                    <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                    <h4 class="transaction__title">${item.name}</h4>
                    <div class="transaction__date">${newDate}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                  ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                  <button class="btn btn-danger transaction__remove" data-id=${item.id}>
                      <i class="fa fa-trash"></i>  
                  </button>
              </div>
            </div>`;
    
  };

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');

    // if (data.length === 0) {
      content.innerHTML = '';
    // };

    // if(data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        let transactionHTML = this.getTransactionHTML(data[i]);
        content.insertAdjacentHTML('beforeEnd', transactionHTML);
      };
    // };
  };
};