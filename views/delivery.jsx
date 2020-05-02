const React = require("react");

class Delivery extends React.Component {
  render() {

    const allDeliveryProductsList = this.props.allDeliveryProducts.map(product => {
        let productClass = 'product-row row ' + product.supermarket_name;
        //let productId
        return (<div className={productClass}>
                    <div className='product-col col-4'>
                        <img src={product.img} alt={product.product_name}/>
                    </div>
                    <div className='product-col col-6'>
                        <div className='product-col-row row'>
                            <p>Delivery Date: {product.delivery_date}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Product: <strong>{product.product_name}</strong></p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Brand: {product.brand}</p>
                        </div>
                        <div className='product-col-row row'>
                            <div className='btn-col col-3'>
                                <button className='btn btn-danger'><a href='#' className='text-white text-decoration-none'>Delete</a></button>
                            </div>
                        </div>
                    </div>
                    <div className='product-col col-2 d-flex justify-content-center'>
                        <div className='qty-box'>
                            <div className='product-col-row row justify-content-center'>
                                <p>Qty</p>
                            </div>
                            <div className='product-col-row row justify-content-center'>
                                <h1>{product.delivery_qty}</h1>
                            </div>
                        </div>
                    </div>
                </div>)
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='../delivery_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-10'>
                        <div className='nav-bar-row row justify-content-center'>
                            <div className='nav-bar-col inventory-tab col-4 nav-bar d-flex justify-content-center'>
                                <h3><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h3>
                            </div>
                            <div className='nav-bar-col delivery-tab col-4 d-flex justify-content-center'>
                                <h3><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h3>
                            </div>
                            <div className='nav-bar-col wishlist-tab col-4 d-flex justify-content-center'>
                                <h3><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h3>
                            </div>
                        </div>
                        <div className='add-button row justify-content-center'>
                            <h4><a href='/delivery/new' className='text-white text-decoration-none'>Add New Delivery</a></h4>
                        </div>
                        <div className='supermarket-banner row justify-content-center'>
                            <img src='https://pluspng.com/img-png/fairprice-logo-png-ntuc-fairprice-logo-logotype-4380.png' style={{width:'30%', height:'30%', padding:'5px'}}/>
                        </div>
                        <div className='row justify-content-between' id='fairprice'>
                            {allDeliveryProductsList}
                        </div>
                        <div className='supermarket-banner row justify-content-center'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDRL44fJQ5UZABdP5FwxWYIo-ohUB6j3NsLQmVYonj_zUuxs6E&usqp=CAU' style={{width:'40%', height:'40%', padding:'5px'}}/>
                        </div>
                        <div className='row justify-content-between' id='coldStorage'>

                        </div>
                         <div className='supermarket-banner row justify-content-center'>
                            <img src='https://dsgcp.com/assets/Uploads/redmart-logo-red.png' style={{width:'30%', height:'30%', padding:'5px'}}/>
                        </div>
                        <div className='row justify-content-between' id='redMart'>

                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <script src='../script.js'></script>
        </body>
      </html>
    );
  }
}

module.exports = Delivery;