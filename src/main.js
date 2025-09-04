/**
 * Функция для расчета прибыли от продаж
 */
function calculateSimpleProfit(purchase, product) {
  return (
    purchase.sale_price * (1 - purchase.discount / 100) * purchase.quantity -
    product.purchase_price * purchase.quantity
  );
}

/**
 * Функция для расчета прибыли от продаж продавца
 */
function calculateSellerProfit(data, seller) {
  let purchase_records = data.purchase_records;
  let products = data.products;
  let totalProfit = 0; // Инициализируем общую выручку

  for (let i = 0; i < purchase_records.length; i++) {
    if (purchase_records[i].seller_id === seller.id) {
      let items = purchase_records[i].items;
      for (let j = 0; j < items.length; j++) {
        let purchase = items[j];
        let product = products.find((product) => product.sku === purchase.sku);
        if (product) {
          // Проверяем, что продукт найден
          totalProfit += calculateSimpleProfit(purchase, product); // Добавляем выручку от текущей покупки к общей выручке
        } else {
          console.warn(`Product with SKU ${items[j].sku} not found.`); //Убрать потом
        }
      }
    }
  }
  return totalProfit;
}

/**
 * Функция для расчета общей выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, product) {
  // const { discount, sale_price, quantity } = purchase;
  // @TODO: Расчет выручки от операции
  return (
    purchase.sale_price * (1 - purchase.discount / 100) * purchase.quantity
  );
}

/**
 * Функция для рассчета общей выручки отдельного продавца(моя)
 * @param {} seller
 * @returns {number} revenu только рассчет общей выручки, остальное будет в другой ф-ии
 */
function calculateSellerRevenue(data, seller) {
  let purchase_records = data.purchase_records;
  let products = data.products;
  let totalRevenue = 0; // Инициализируем общую выручку

  for (let i = 0; i < purchase_records.length; i++) {
    if (purchase_records[i].seller_id === seller.id) {
      let items = purchase_records[i].items;
      for (let j = 0; j < items.length; j++) {
        let purchase = items[j];
        let product = products.find((product) => product.sku === purchase.sku);
        if (product) {
          // Проверяем, что продукт найден
          totalRevenue += calculateSimpleRevenue(purchase, product); // Добавляем выручку от текущей покупки к общей выручке
        } else {
          console.warn(`Product with SKU ${items[j].sku} not found.`); //Убрать потом
        }
      }
    }
  }
  return totalRevenue;
}

//
/**
 * Функция для рассчета количества продаж конкретного продавца
 *
 */
function calculatesellerSalesCount(data, seller) {
  let totalSalesCount = 0;
  let purchase_records = data.purchase_records;

  for (let i = 0; i < purchase_records.length; i++) {
    if (purchase_records[i].seller_id === seller.id) {
      totalSalesCount += 1;
    }
  }
  return totalSalesCount;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
  // @TODO: Расчет бонуса от позиции в рейтинге

  if (index === 0) {
    // Первый элемент - максимальная прибыль
    return seller.profit * 0.15;
  } else if (index >= 1 && index <= 2) {
    // Второй и третий элементы
    return seller.profit * 0.1;
  } else if (index < total - 1) {
    // Все остальные, кроме последнего
    return seller.profit * 0.05;
  } else {
    // Последний элемент
    return 0;
  }
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

  let sellersArr = [];

  for (let i = 0; i < sellers.length; i++) {
    let sellerRevenue = calculateSellerRevenue(data, sellers[i]);
    let sellerProfit = calculateSellerProfit(data, sellers[i]);
    let sellerSalesCount = calculatesellerSalesCount(data, sellers[i]);
    sellersArr.push({
      id: sellers[i].id,
      name: `${sellers[i].first_name} ${sellers[i].last_name}`,
      revenue: sellerRevenue,
      profit: sellerProfit,
      sales_count: sellerSalesCount,
      products_sold: {},
    });
  }
  console.log(sellersArr);

  // @TODO: Сортировка продавцов по прибыли
  sellersArr.sort((a, b) => b.profit - a.profit);
  console.log(sellersArr);

  // @TODO: Назначение премий на основе ранжирования
  sellersArr.forEach((seller, index) => {
    let figVam = calculateBonusByProfit(index, sellersArr.length, seller);
    console.log(figVam);
    seller.bonus = figVam;
  });

  console.log(sellersArr);

  // @TODO: Подготовка итоговой коллекции с нужными полями
}
