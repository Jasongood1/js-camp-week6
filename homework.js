// ========================================
// 第六週作業：電商 API 資料串接練習
// 執行方式：node homework.js
// 環境需求：Node.js 18+（內建 fetch）
// ========================================

// 載入環境變數
require("dotenv").config({ path: ".env" });

// API 設定（從 .env 讀取）
const API_PATH = process.env.API_PATH; //讀取API_PATH變數的值
const BASE_URL = "https://livejs-api.hexschool.io";
const ADMIN_TOKEN = process.env.API_KEY; //讀取API_KEY變數的值

// ========================================
// 任務一：基礎 fetch 練習
// ========================================

/**
 * 1. 取得產品列表
 * 使用 fetch 發送 GET 請求
 * @returns {Promise<Array>} - 回傳 products 陣列
 */
async function getProducts() {
	// 請實作此函式
	// 提示：
	// 1. 使用 fetch() 發送 GET 請求
	// 2. 使用 response.json() 解析回應
	// 3. 回傳 data.products
	const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`);
	console.log(response);//小布測試response的資料
	const data = await response.json(); //解析全部成json格式
	console.log(data);//小布測試data的資料
	return data.products;//只要取得products 陣列
}

/**
 * 2. 取得購物車列表
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function getCart() {
	// 請實作此函式
	const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`);
	console.log(response);
	const data = await response.json(); //解析全部成json格式
	console.log(data);//小布測試data的資料
	return {
		carts:data.carts,
		total:data.tatol,
		finalTotal:data.finalTotal
	}
}

/**
 * 3. 錯誤處理：當 API 回傳錯誤時，回傳錯誤訊息
 * @returns {Promise<Object>} - 回傳 { success: boolean, data?: [...], error?: string }
 */
async function getProductsSafe() {
	// 請實作此函式
	// 提示：
	// 1. 加上 try-catch 處理錯誤
	// 2. 檢查 response.ok 判斷是否成功
	// 3. 成功回傳 { success: true, data: [...] }
	// 4. 失敗回傳 { success: false, error: '錯誤訊息' }
	try{
		const response = await fetch(
			`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`
		);
		console.log(response);//小布測試response的資料
		//檢查http狀態瑪
		if(!response.ok){
			const errorData = await response.json();
			return{
				 success: false, error: error.message
			}
		}
		const data = await response.json(); //解析全部成json格式
		console.log(data);//小布測試data的資料
		return {
			success: true,
			data:data.products//取得物件
		}
	}catch(error){
		 // 處理網路錯誤、JSON 解析錯誤等
		return { 
			success: false,
			error: error.message
		}
	}
}

// ========================================
// 任務二：POST 請求 - 購物車操作
// ========================================

/**
 * 1. 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function addToCart(productId, quantity) {
	// 請實作此函式
	// 提示：
	// 1. 發送 POST 請求
	// 2. body 格式：{ data: { productId: "xxx", quantity: 1 } }
	// 3. 記得設定 headers: { 'Content-Type': 'application/json' }
	// 4. body 要用 JSON.stringify() 轉換
	 const response = await fetch(
    `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          productId: productId, // 要更新的項目 ID
          quantity: quantity, // 新的數量
        },
      }),
    },
  );

  const data = await response.json();
  return data;
}

/**
 * 2. 編輯購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function updateCartItem(cartId, quantity) {
	// 請實作此函式
	// 提示：
	// 1. 發送 PATCH 請求
	// 2. body 格式：{ data: { id: "購物車ID", quantity: 數量 } }
	const response = await fetch(
    `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: cartId, // 要更新的項目 ID
          quantity: quantity, // 新的數量
        },
      }),
    },
  );

  const data = await response.json();
  return data;
}

/**
 * 3. 刪除購物車特定商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳更新後的購物車資料
 */
async function removeCartItem(cartId) {
	// 請實作此函式
	// 提示：發送 DELETE 請求到 /carts/{id}
	const response = await fetch
		(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`,{
			method:'DELETE',
		});
	const data = await response.json();
	return data;
}

/**
 * 4. 清空購物車
 * @returns {Promise<Object>} - 回傳清空後的購物車資料
 */
async function clearCart() {
	// 請實作此函式
	// 提示：發送 DELETE 請求到 /carts
	const response = await fetch
		(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,{
			method:'DELETE',
		});
	const data = await response.json();
	return data;
}

// ========================================
// HTTP 知識測驗 (額外練習)
// ========================================

/*
請回答以下問題（可以寫在這裡或另外繳交）：

1. HTTP 狀態碼的分類（1xx, 2xx, 3xx, 4xx, 5xx 各代表什麼）
   答：
   類別        範圍        意義                      常見狀態碼
   1xx         100~199    資訊回應 (Informational)   100 Continue,101 Switching Protocols
   2xx         200~299    成功                       200 OK, 201 Created,204 No Content
   3xx         300~399    重新導向                   301 Moved, Moved Temporarily,304 Not Modified
   4xx         400~499    客戶端錯誤                 400 Bad Request, 401 Unauthorized, 403 Forbidden,404 Not Found
   5xx         500~599    伺服器錯誤                 500 Internal Server Error,502 Bad Gateway,503 Service Unavailable



2. GET、POST、PATCH、PUT、DELETE 的差異
   答：

   方法          用途         Request Body       範例  
   GET           讀取資料     無                 讀取產品列表
   POST          建立資料     有                 新增商品到購物車
   PUT           全部更新     有                 更新使用者全部資訊
   PATCH         部分更新     有                 更新購物車數量
   DELETE        刪除資料     無                 刪除購物車商品


3. 什麼是 RESTful API？
   答：
   REST（Representational State Transfer）是一種 API 設計風格：
   只要符合其六大設計約束（最核心的是無狀態性與統一介面），就能被稱為 RESTful API。
   
   REST六大設計
   資源導向 (Resource-Oriented):網路 使用者、文章、商）都是「資源」。每個資源都有一個全域唯一的 URI（Uniform Resource Identifier）
   統一介面 (Uniform Interface):HTTP 標準方法（GET, POST, PUT, PATCH, DELETE）來對資源進行操作，絕不在 URL 中夾帶動詞
   無狀態性 (Statelessness)：是分散式系統擴展的關鍵。伺服器絕對不在本地端保存客戶端的 Session 狀態。每一個請求都必須包含伺服器理解與處理該請求所需的「所有資訊」（例如附帶 JWT Token）
   表現層 (Representational)：伺服器可以把同一個資源，依照客戶端的 Accept 標頭，轉換成 JSON、XML 或 HTML 來「表現」出來。

   為何前後端分離框架（React, Vue 搭配 Node.js）幾乎全面採用 RESTful API
   可預測性 (Predictability)：前端看到 DELETE /articles/42，他不需要翻閱厚重的技術文件，就能憑藉直覺知道這是在刪除 ID 為 42 的文章。
   前後端解耦 (Decoupling)：前端專注於 UI 渲染，後端專注於資料處理與權限控制,雙方僅靠 JSON 格式的 REST API 簽訂「契約」，互不干涉底層實作細節。
   快取機制 (Cacheability)：嚴格遵守了 GET 的語義，瀏覽器與 CDN 能夠自動且安全地對這類請求進行快取，大幅降低伺服器負載。




   RESTful 設計 - 清楚的資源導向
   GET      /api/products          // 取得所有產品
   GET      /api/products/123      // 取得特定產品
   POST     /api/products          // 建立新產品
   PUT      /api/products/123      // 更新產品
   DELETE   /api/products/123      // 刪除產品

   非 RESTful 設計 - 動作導向
   GET    /api/getAllProducts
   GET    /api/getProductById?id=123
   POST   /api/createProduct
   POST   /api/updateProduct
   POST   /api/deleteProduct







*/

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
	API_PATH,
	BASE_URL,
	ADMIN_TOKEN,
	getProducts,
	getCart,
	getProductsSafe,
	addToCart,
	updateCartItem,
	removeCartItem,
	clearCart,
};

// ========================================
// 直接執行測試
// ========================================
if (require.main === module) {
	async function runTests() {
		console.log("=== 第六週作業測試 ===\n");
		console.log("API_PATH:", API_PATH);
		console.log("");

		if (!API_PATH) {
			console.log("請先在 .env 檔案中設定 API_PATH！");
			return;
		}

		// 任務一測試
		console.log("--- 任務一：基礎 fetch ---");
		try {
			const products = await getProducts();
			console.log(
				"getProducts:",
				products ? `成功取得 ${products.length} 筆產品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getProducts 錯誤:", error.message);
		}

		try {
			const cart = await getCart();
			console.log(
				"getCart:",
				cart ? `購物車有 ${cart.carts?.length || 0} 筆商品` : "回傳 undefined",
			);
		} catch (error) {
			console.log("getCart 錯誤:", error.message);
		}

		try {
			const result = await getProductsSafe();
			console.log(
				"getProductsSafe:",
				result?.success ? "成功" : result?.error || "回傳 undefined",
			);
		} catch (error) {
			console.log("getProductsSafe 錯誤:", error.message);
		}
		//任務二測試
		console.log("--- 任務二：POST 請求 購物車操作 ---");
		try{
			const addCart = await addToCart('3r6pqODf235FNxCI48r9', 2);
			console.log(addCart);
			//三元運算子 條件 ? 當條件為 True 時執行 : 當條件為 False 時執行
			console.log(
				"addToCart:",
				addCart?.status ? "成功" : addCart?.error || "回傳 undefined",
			);

		}catch(error){
			console.log("addToCart 錯誤:", error.message);
		}

		try{
			const upDateCart = await updateCartItem('9mMqhU1P4Cie9lWS5aKi',3);
			console.log(upDateCart);
			//三元運算子 條件 ? 當條件為 True 時執行 : 當條件為 False 時執行
			console.log(
			    'updateCartItem:',
				upDateCart?.status ? '成功' : upDateCart?.error ||' 回傳 undefined',
			);

		}catch(error){
			console.log('updateCartItem 錯誤:', error.message);
		}

		try{
			const delCart = await removeCartItem('9mMqhU1P4Cie9lWS5aKi');
			console.log(delCart);
			//三元運算子 條件 ? 當條件為 True 時執行 : 當條件為 False 時執行
			console.log(
			    'removeCartItem:',
				delCart?.status ? '成功' : delCart?.error ||' 回傳 undefined',
			);

		}catch(error){
			console.log('removeCartItem 錯誤:', error.message);
		}

		try{
			const cleCart = await clearCart('9mMqhU1P4Cie9lWS5aKi');
			console.log(cleCart);
			//三元運算子 條件 ? 當條件為 True 時執行 : 當條件為 False 時執行
			console.log(
			    'clearCart:',
				cleCart?.status ? '成功' : cleCart?.error ||' 回傳 undefined',
			);

		}catch(error){
			console.log('clearCart 錯誤:', error.message);
		}

		console.log("\n=== 測試結束 ===");
		console.log("\n提示：執行 node test.js 進行完整驗證");
	}

	runTests();
}
