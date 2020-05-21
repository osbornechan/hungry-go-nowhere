const React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href='../login_styles.css' rel='stylesheet'/>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <br/>
                <div className='row justify-content-center'>
                    <div className='bowl'>
                        <div className='row justify-content-center'>
                            <img src='../logo-reverse.png'/>
                        </div>
                        <div className='row justify-content-center'>
                            <h3 className='text-center'>Login</h3>
                        </div>
                        <br/>
                        <div className='row justify-content-center'>
                            <div className='row justify-content-center'>
                                <form method='POST' action='/inventory'>
                                    <div className='row justify-content-center'>
                                        <p>Username: <input type='text' name='user_name' placeholder='Alice (Test Account)'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Password:  <input type='password' name='password' placeholder='123' /></p>
                                    </div>
                                    <br/>
                                    <div className='row justify-content-center'>
                                        <div className='col-6 d-flex justify-content-center'>
                                            <input type='submit' value='Submit' className='btn btn-info'/>
                                        </div>
                                        <div className='col-6 d-flex justify-content-center'>
                                            <button className='btn'><a href='/' className='cancel-btn'>Cancel</a></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='bowl-base col-3'></div>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;