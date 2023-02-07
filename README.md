
## 檔案說明
本次檔案幾乎是從 https://college.itri.org.tw//domain_BIM/index.html copy 過來，以下列出本次調整有特別改過的地方
- index.html: 領域專頁首頁
  - 有暫時註解掉 `<script src="JsPage/index.js"></script>`，因為 js 裡面有 call API，我不在你們網域開發會有跨域 CORS error，因此切板時暫時註解掉。
- css
  - nz_style.css: 領域專頁客製 css
  - slick-theme.css : 主要是複製 https://college.itri.org.tw/nzschool/index.html 的檔案，然後有微調一點點。
  - fonts
    - slick.woff :從淨零永續學校抓來的，用在 slick 輪播圖
- img
  - layout
    - icon_mail.png : 訂閱電子報的信箱圖片(從產業學習網抓來的)
## 檔案結構
domain                                
├─ css                                
│  ├─ fonts                           
│  │  └─ slick.woff                   
│  ├─ plugin                          
│  │  ├─ fontawesome-free-5.15.4-web  
│  │  └─ bootstrap.min.css            
│  ├─ ajax-loader.gif                 
│  ├─ my_style.css                    
│  ├─ nz_style.css                    主要定義領域專頁的css
│  ├─ slick-theme.css                 從原本網站 copy 過來有修改一點點地方
│  └─ slick.min.css                   
├─ images                             
│  └─ banners                         
├─ img                                
│  ├─ example                         demo 用圖片
│  └─ layout                          網站主要元素、logo 圖片
│     ├─ favicon.ico                  
│     ├─ footer_logo.png              
│     ├─ icon_mail.png                
│     └─ logo.png                     
├─ js                                 
│  ├─ plugin                          
│  │  ├─ bootstrap.min.js             
│  │  └─ jQuery-v3.3.1.miin.js        
│  ├─ myscripts.js                    
│  ├─ nz-script.js                    
│  └─ slick.min.js                    
├─ JsPage                                               
├─ footer.html                        
├─ header.html                        
├─ index.html                         領域專頁 html
├─ index_banner.html                  
├─ index_member.html                  
├─ menu.html                          
└─ README.md                          說明檔
