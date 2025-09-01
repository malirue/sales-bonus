/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
  // const { discount, sale_price, quantity } = purchase;
  // @TODO: Расчет выручки от операции
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
  // const { profit } = seller;
  // @TODO: Расчет бонуса от позиции в рейтинге
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
  let sellers = data.sellers;
  // @TODO: Проверка входных данных

  // @TODO: Проверка наличия опций

  // @TODO: Подготовка промежуточных данных для сбора статистики

  // @TODO: Индексация продавцов и товаров для быстрого доступа

  // @TODO: Расчет выручки и прибыли для каждого продавца
  // let pizdatyMassiv = [];
  // for (let i = 0; i < 10; i++) {
  //   pizdatyMassiv.push({ ise: i });
  // }
  // console.log(pizdatyMassiv);

  /**
   * [
   *  { seller_id: 1,
   *    revenue: 0;
   *  }
   * ]
   */
  let govno = [];

  let sellersArr = [];

  for (let i = 0; i < sellers.length; i++) {
    let sellerRevenue = calculateSellerRevenue(sellers[i]);
    sellersArr.push({ seller_id: sellers[i].id, revenue: sellerRevenue });
  }
  console.log(sellersArr);

  // @TODO: Сортировка продавцов по прибыли
  console.log(govno);

  // @TODO: Назначение премий на основе ранжирования

  // @TODO: Подготовка итоговой коллекции с нужными полями
}
/**
 * Функция для рассчета выручки отдельного продавца
 * @param {} seller
 */
function calculateSellerRevenue(seller) {
  // let fromPercentToDecimal = discount / 100;
  // let fullPrice = sale_prise * qanity;
  // let priceWithoutDiscount = fullPrice * fromPercentToDecimal;
  console.log(seller);
  return 0;
}
