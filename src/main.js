/**
 * Функция для расчета прибыли от продаж
 */
function calculateSimpleProfit(purchase, product) {
  return (
    Math.round((purchase.sale_price * (1 - purchase.discount / 100) * purchase.quantity -
    product.purchase_price * purchase.quantity) * 100) / 100
  );
}

/**
 * Функция для расчета прибыли от продаж продавца
 */
function calculateSellerProfit(data, seller) {
  let purchase_records = data.purchase_records;
  let products = data.products;
  let totalProfit = 0;

  for (let i = 0; i < purchase_records.length; i++) {
    if (purchase_records[i].seller_id === seller.id) {
      let items = purchase_records[i].items;
      for (let j = 0; j < items.length; j++) {
        let purchase = items[j];
        let product = products.find((product) => product.sku === purchase.sku);
        if (product) {
          // Проверяем, что продукт найден
          totalProfit += calculateSimpleProfit(purchase, product); // Добавляем выручку от текущей покупки к общей выручке
        }
      }
    }
  }
  return Math.round(totalProfit * 100) / 100;
}

/**
 * Функция для расчета Топ 10 товаров конкретного продавца
 * @param data общие данные
 * @param sellerId id продавца из чека
 */
function calculateTopTenItems(data, sellerId) {
  let purchase_records = data.purchase_records;
  let mapped = new Map();

  purchase_records.forEach((record) => {
    if (record.seller_id !== sellerId) {
      return;
    }

    let items = record.items;

    items.forEach((item) => {
      if (!mapped.has(item.sku)) {
        mapped.set(item.sku, item.quantity);
      } else {
        mapped.set(item.sku, mapped.get(item.sku) + item.quantity);
      }
    });
  });

  let res = [];

  mapped.forEach((quantity, sku) => {
    res.push({ sku, quantity });
  });

  res.sort((a, b) => b.quantity - a.quantity);

  return res.slice(0, 10);
}

/**
 * Функция для расчета общей выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, product) {
  // @TODO: Расчет выручки от операции
  return (
   Math.round(purchase.sale_price * purchase.quantity * (1 - purchase.discount / 100) * 100) / 100 
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
  let totalRevenue = 0;

  for (let i = 0; i < purchase_records.length; i++) {
    if (purchase_records[i].seller_id === seller.id) {
      let items = purchase_records[i].items;
      for (let j = 0; j < items.length; j++) {
        let purchase = items[j];
        let product = products.find((product) => product.sku === purchase.sku);
        if (product) {
          // Проверяем, что продукт найден
          totalRevenue += calculateSimpleRevenue(purchase, product); // Добавляем выручку от текущей покупки к общей выручке
        }
      }
    }
  }
  return Math.round(totalRevenue * 100) / 100;
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
    return Math.round((seller.profit * 0.15) * 100) / 100;
  } else if (index >= 1 && index <= 2) {
    // Второй и третий элементы
    return Math.round((seller.profit * 0.1) * 100) / 100;
  } else if (index < total - 1) {
    // Все остальные, кроме последнего
    return Math.round((seller.profit * 0.05) * 100) / 100;
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
  if (
    !data ||
    !Array.isArray(data.sellers) ||
    data.sellers.length === 0 ||
    !Array.isArray(data.products) ||
    data.products.length === 0 ||
    !Array.isArray(data.purchase_records) ||
    data.purchase_records.length === 0
  ) {
    throw new Error("Некорректные входные данные");
  }

  // @TODO: Проверка наличия опций
  const { calculateRevenue, calculateBonus } = options;
  if (!calculateRevenue || !calculateBonus) {
    throw new Error("Чего-то не хватает");
  }
  // @TODO: Подготовка промежуточных данных для сбора статистики

  // @TODO: Индексация продавцов и товаров для быстрого доступа

  // @TODO: Расчет выручки и прибыли для каждого продавца

  let sellersArr = [];

  for (let i = 0; i < sellers.length; i++) {
    let sellerRevenue = calculateSellerRevenue(data, sellers[i]);
    let sellerProfit = calculateSellerProfit(data, sellers[i]);
    let sellerSalesCount = calculatesellerSalesCount(data, sellers[i]);
    sellersArr.push({
      seller_id: sellers[i].id,
      name: `${sellers[i].first_name} ${sellers[i].last_name}`,
      revenue: sellerRevenue,
      profit: sellerProfit,
      sales_count: sellerSalesCount,
      top_products: {},
    });
  }

  // @TODO: Сортировка продавцов по прибыли
  sellersArr.sort((a, b) => b.profit - a.profit);

  // @TODO: Назначение премий на основе ранжирования
  sellersArr.forEach((seller, index) => {
    let figVam = calculateBonusByProfit(index, sellersArr.length, seller);
    seller.bonus = figVam;
  });

  // @TODO: Топ 10 товаров продавца
  sellersArr.forEach((seller, index, sellers) => {
    seller.top_products = calculateTopTenItems(data, seller.seller_id);
  });

  // @TODO: Подготовка итоговой коллекции с нужными полями
  return sellersArr;
}
