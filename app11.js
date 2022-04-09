/**
 * Router 객체를 이용해 라우팅 함수 등록하기
 * POST로 요청할 때 URL 파라미터를 params 객체로 확인
 *
 * (1) 웹 브라우저에서 http://localhost:3000/public/login3.html 페이지 열고 요청
 * (2) 크롬 브라우저 : POST 방식으로 요청
 */

var cookieParser = require('cookie-parser');

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')

, static = require('serve-static');

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/showCookie').get(function(req, res) {
	console.log('/process/showCookie 처리함.');

   
    res.cookie('user', {
        id:'mike',
        name:'소녀시대',
        authorized:ture
    });
    res.redirect('/process/showCookie');
	
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies);
});

var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
static: {
'404': './public/404.html'
}
});
app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );






app.use('/', router);


// 등록되지 않은 패스에 대해 페이지 오류 응답
/* app.all('*', function(req, res) {
	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
}); */


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});