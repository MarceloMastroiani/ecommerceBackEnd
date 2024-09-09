class ProductManager {
    constructor(){
        
        this.products = []
        
    }
    
    static id = 0
    addProduct( title, description, price, thumbnail,code, stock ){

    for(let i = 0; i < this.products.length; i++){
      if(this.products[i].code === code){
        console.log("el codigo ya se ingreso")
        break
      }
    }

      const product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code:code,
        stock: stock,
      }

      if(Object.values(product).includes(undefined)){
          console.log("All fields need to be added")
      }else{
        ProductManager.id++
        return this.products.push({ ...product,id: ProductManager.id })
      }
    }

    getProducts = () => this.products;

    getProductById(id){
     
      if(this.products.find((productID)=> productID.id === id)){
          console.log("found")
      }else{
        console.log("Not found")
      }
    }
  }

// TESTING //
 const testing = new ProductManager()

 console.log(testing.getProducts())

 testing.addProduct("messi1", "aaaa", 1000, "bbbb","abc123",2)
 testing.addProduct("messi3", "eeee", 1002, "ffff","abc235",4)
 
 console.log(testing.getProducts())
 testing.addProduct("messi2", "cccc", 1001, "dddd","abc123",3)

 testing.getProductById(2)