/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), ( err, response ) => {
      if (err) {
        alert('передан не верный Account.list');
      };

      if (!response.success) {
        return;
      };

      const activity = this.element.getAttribute('id').slice(4, -5);
      const activityType = document.querySelector(`#${activity}-accounts-list`);
      activityType.innerHTML = '';

      if(response) {
        response.data.forEach((e) => {
          activityType.insertAdjacentHTML('beforeEnd', `<option value="${e.id}">${e.name}</option>`);
        });
      };
    });
  };

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, ( err, response ) => {
      if (err) {
        alert('не верно введен onSubmit');
      };



      const id = this.element.getAttribute('id').slice(4, -5);
      const form = 'new' + id.substring(0, 1).toUpperCase() + id.substring(1);
    
      App.getModal(form).close();
      this.element.reset();
      App.update();
    });
  };
};