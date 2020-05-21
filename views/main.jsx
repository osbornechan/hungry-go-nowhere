const React = require("react");

class Main extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href='/main_styles.css' rel='stylesheet'/>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <br/>
                <div className='row justify-content-center'>
                    <div className='bowl col-8'>
                        <div className='img-row row justify-content-center'>
                            <img src='../logo-reverse.png'/>
                        </div>
                        <div className='row justify-content-center'>
                            <h4 className='text-center'>Your Food Inventory Tracker</h4>
                        </div>
                        <div className='row justify-content-center'>
                            <p className='text-center'>Never again wonder what happened to those tomatoes.</p>
                        </div>
                        <br/>
                        <div className='row justify-content-center'>
                            <p className='text-center'>#sgunited #stayhomesg #ccb</p>
                        </div>
                    </div>
                    <div className='space col-1'></div>
                    <div className='cup col-3'>
                        <div className='liquid'>
                            <div className='row justify-content-center'>
                                <button className='btn'><a href='/login/' className='btn-text'>Login</a></button>
                                <p class="text-muted">Click to login with test account</p>
                            </div>
                            <div className='row justify-content-center'>
                                <p>New user? Register <a href='/register' className='register-link'>here</a></p>
                            </div>
                        </div>
                    </div>
                    <div className='bowl-base col-3'></div>
                    <div className='base-space col-3'></div>
                    <div className='cup-base col-3'></div>
                    <div className='table row justify-content-center'></div>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Main;