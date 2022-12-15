import { createSlice } from "@reduxjs/toolkit";
import {productsData} from '../../data'


const getUniqueCategories = (categories) => {
  
    let tempArr = ["all"]
    let uniqueCategories = categories.map((element)=>[... new Set(element.products.map((singleCategoryName)=> singleCategoryName.category))]);
    uniqueCategories = uniqueCategories.map((element)=>{
        return element.map((item)=>{
            if(!tempArr.includes(item)){
                tempArr.push(item)
            }
        })
    });
  
    //console.log([...uniqueCategories[0],...uniqueCategories[1],...uniqueCategories[2]])
    return tempArr;
}   


const getUniqueCurrencies = (currencies) => {
     let uniqueCurrencies = currencies[0].products.map((item)=>  item.prices.map((price)=> {
        return {symbol:price.currency.symbol,label:price.currency.label}
    
    }));
    // unique currencyl 
    uniqueCurrencies  = uniqueCurrencies[0]
   return uniqueCurrencies;
}

const initialState = {
    products: productsData.data.categories,
    categoryNames: getUniqueCategories(productsData.data.categories),
    currencyNames: getUniqueCurrencies(productsData.data.categories),
    itemsBasedOnCategory: [],
    amount: 0,
    total: 0,
    cartItems: [],
    cartItemSelectedOptions: [],
   //before adding to cart
    beforeCartSelectedOptions: [],
    isCartOpen: false,
    isExchangeOpen: false,
    tempProd: [],
    singleProductNotInCart: [],
    singleProductInCart: [],
    // manipulating single page pictures
    imgIndex:0,
    currencyIndex: 0,
    

}


const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers:{
        whichCategoryIsSelected:  (state,action) => {
            let tempItems = state.products;
            let singleCategoryItems;
            
            if(action.payload !== "all"){
                
                 singleCategoryItems = tempItems.map((element)=> element.products.filter((item)=> item.category === action.payload));
                singleCategoryItems = singleCategoryItems.filter((element)=> Math.max(element.length))
                state.itemsBasedOnCategory = singleCategoryItems;

            }else{
                
                singleCategoryItems = tempItems.map((element)=> element.products.map((item)=> item)); 
                state.itemsBasedOnCategory = singleCategoryItems;
            }
             
        },
       whichCurrencyIsSelected: (state,action) => {
            state.currencyIndex = action.payload.i;
            state.isExchangeOpen = !state.isExchangeOpen;
       },
        calculateTotal: (state,action) => {
            let tempAmount = 0;
            let tempTotal = 0;
            state.cartItems.forEach((element)=> {
            tempAmount += element.amount;
            tempTotal += element.amount * element.prices[state.currencyIndex].amount;
        })

        state.amount = tempAmount;
        state.total = tempTotal;
        },
       
        addToCart: (state,action) => {
        
        let tempCartItem;
        let isDuplicate;
        
        if(state.cartItems.length > 0){
            isDuplicate = state.cartItems.find((item)=> item.id === action.payload.id);
        }
        if(state.cartItems.length === 0 || isDuplicate === undefined){
            tempCartItem = state.itemsBasedOnCategory[0].find((item) =>  item.id === action.payload.id);
            tempCartItem = {...tempCartItem, amount:1}
            state.cartItems = [...state.cartItems,tempCartItem];
            // add options to 
            if(state.beforeCartSelectedOptions.length > 0){
                state.cartItemSelectedOptions = [...state.beforeCartSelectedOptions];
            }
            
        }
    
        },
        selectCartOptions: (state, action) => {
            //console.log(action.payload);

            const selectedOptions = {
                id: action.payload.id,
                // category -> Size
                name: action.payload.name,
                productName: action.payload.productName,
            }

            const productInCart = state.cartItems.find((product)=> product.id === action.payload.productName);
            
            //console.log(productInCart)
           
           if(productInCart === undefined){
                // this means that unOrder product from singleProduct page.
                if(state.beforeCartSelectedOptions?.length === 0){
                    state.beforeCartSelectedOptions = [...state.beforeCartSelectedOptions, selectedOptions];
                }else{
                   // if product is not still in cart && product's id(the value, 42 for shoe) has changed
                    const updated = state.beforeCartSelectedOptions.find((item)=> {
                        if((item.name === selectedOptions.name) && (item.productName === selectedOptions.productName)){
                            return item;
                        }
                    });
                    
                    if(updated === undefined){
                        state.beforeCartSelectedOptions = [... state.beforeCartSelectedOptions,selectedOptions];
    
                    }else{ 
                        updated.id = selectedOptions.id;
                    }
                    
                }

            }
           
            else if(state.cartItemSelectedOptions?.length === 0 && state.cartItems.find((product)=> product.name === selectCartOptions.productName)){
                // if cart has items and select some options.
               state.cartItemSelectedOptions = [...state.cartItemSelectedOptions,selectedOptions];
            }else{

                const shouldUpdate = state.cartItemSelectedOptions.find((item)=> {
                    if((item.name === selectedOptions.name) && (item.productName === selectedOptions.productName)){
                        return item;
                    }
                });
                if(shouldUpdate === undefined){
                    state.cartItemSelectedOptions = [...state.cartItemSelectedOptions,selectedOptions];

                }else{ 
                    shouldUpdate.id = selectedOptions.id;
                }

            }
    },
    setCartImage: (state,action) => {
        //(action.payload)
        
       const singleItem = {
        id: action.payload.id,
        gallery: action.payload.gallery,
        galleryLength: action.payload.gallery.length - 1,
        initialIndex: 0,
       }

       const shouldAdd = state.tempProd.find((item) => item.id === singleItem.id);
       //console.log(shouldAdd)
       if(shouldAdd === undefined && action.payload.move === "initial"){
        singleItem.initialIndex = 0;
        state.tempProd = [...state.tempProd,singleItem]
       }
   
       else{
        if(action.payload.move === "next"){
            if(shouldAdd.initialIndex < shouldAdd.galleryLength){
                shouldAdd.initialIndex += 1;
                
            }else{
                shouldAdd.initialIndex = 0;
            }
          
        }else{
            if(shouldAdd.initialIndex === 0){
                shouldAdd.initialIndex = shouldAdd.galleryLength ;
            }else{
                shouldAdd.initialIndex -= 1;
            }
            // when you have found item from state, and are updating it's value you don't need to save it in sate reguralry
           // state.tempProd = [...state.tempProd,singleItem]
        }
       }
    
        
    },

    changeSinglePageImg: (state,action) => {
        //console.log(action.payload)
        state.imgIndex = action.payload.i
    },

    inCart: (state,action) => {
        // in here action.payload.id is the id of the product.

        let product;
        // search in cartItems;
        product = state.cartItems.find((item)=> item.id === action.payload.id);

        if(product){
            if( state.singleProductInCart?.length > 0){
                state.singleProductInCart = [];
                state.imgIndex = 0;
            }
                state.singleProductInCart = [...state.singleProductInCart,product];

            
            state.singleProductNotInCart = [];
            state.beforeCartSelectedOptions = [];
           
        }else{
            // if not in Cart scenario

            // if product is in `cart` and you are product which are not in the `cart` you have to 
            // remove it from array. otherwise. product which is in the cart will be renderred.
            state.imgIndex = 0;
            state.singleProductInCart = [];
            
            let product;

            if(state.singleProductNotInCart?.length === 0){
                
                
                product = state.itemsBasedOnCategory[0].find((item)=> item.id === action.payload.id);
                state.singleProductNotInCart = [...state.singleProductNotInCart, product]
            }else if(state.singleProductNotInCart?.length > 0 && state.singleProductNotInCart[0].id !== action.payload.id){
                // measn new product
                
                product = state.itemsBasedOnCategory[0].find((item)=> item.id === action.payload.id);

                // before removing item from `singleProductNotInCart`, you have to also remove
                // its' selected crap from `beforeCartSelectedOptions`;

                state.beforeCartSelectedOptions = state.beforeCartSelectedOptions.filter((item)=> item === state.singleProductNotInCart[0].id)
                state.singleProductNotInCart = [product]
            }
            
        }



    },
 
      

        setCartOpen: (state,action) => {
            if(state.isExchangeOpen){
                state.isExchangeOpen = !state.isExchangeOpen;
            }
            state.isCartOpen = !state.isCartOpen;
        },

        setExchangeOpen: (state,action) => {
            if( state.isCartOpen){
                state.isCartOpen = ! state.isCartOpen;
            }
            state.isExchangeOpen = !state.isExchangeOpen;
        },
        toggle: (state,action) => {
            if(action.payload.incdec === "inc"){
                const cartItem = state.cartItems.find((item) => item.id === action.payload.productId);
                cartItem.amount += 1;
                
    
            }else{
                const cartItem = state.cartItems.find((item) => item.id === action.payload.productId);
                if(cartItem.amount > 1){
                    cartItem.amount -= 1;
                }else{
                    state.cartItems =  state.cartItems.filter((item) => item.id !== action.payload.productId);
                    state.cartItemSelectedOptions = state.cartItemSelectedOptions.filter((item)=> item.productName !== action.payload.productId);
                    state.tempProd = state.tempProd.filter((item)=> item.id !== action.payload.productId);
                }
               
            }
        },
        
    }

});


export const {whichCategoryIsSelected,addToCart,setCartOpen,toggle,calculateTotal,selectCartOptions, setCartImage,inCart,changeSinglePageImg,setExchangeOpen,whichCurrencyIsSelected} = productsSlice.actions;


export default productsSlice.reducer;



// implement single product page.


