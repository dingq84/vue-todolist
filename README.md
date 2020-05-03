# Vue Todolist

## 前言  
&emsp;&emsp;在開發初期，我們可以清楚知道每個Component扮演的角色、負責的職責，但隨著時間流逝，常常會使Component存在不屬於自己職責的程式碼，原因有很多種：像是需求的改變、Bug的修改、協作者不清楚Component職責，或是未來的自己忘記這個Component原本要處理哪些事情等等，使Component越來越大包，沒有一個人完整知道架構，也沒有人敢進行重構，畢竟老闆不會管你程式碼寫得多髒多醜，只在乎功能正常，如果你重構造成不可挽回的Bug，你可能也變成公司不會挽回的人，那有什麼辦法可以減低這些問題呢？那就是寫測試了。  
&emsp;&emsp;最近在整理Javascript testing的筆記，雖然接觸測試這一塊已經一年左右，但有很多測試的事情都沒有搞得很清楚，包含測試相關的功能和測試的想法等等，而且平時鮮少撰寫測試，因此測試對我來說一直是一個灰色地帶，說不上熟練也不是完全不會，一直缺少一個動機去補起來，然而剛好開始學習Vue，因自己之前已經使用React一段時間，兩者有部分相似的地方，因此門檻對我來說沒有很高，而且剛好看了Sarah Dayan的[Test driven development with Vue.js](https://www.youtube.com/watch?v=DD1fEhcEzY8)影片，對於想實踐測試和學習Vue的我來說，簡直是量身定做，所以下定決心使用ＴＤＤ的開發方式來玩成這個專案，因為要練習的技術對我算是重大挑戰，所以挑選了做過無數遍的TodoList。
## 功能
&emsp;&emsp;本次的TodoList的功能和大家熟悉的差不多，有以下：  
   * 新增待辦事項、修改待辦事項
       * 待辦事項名稱
       * 起始日
       * 是否完成
       * 完成日
       * 待辦事項的描述
       * 隸屬於哪個專案
   * 新增專案、修改專案
       * 專案名稱
   * 搜尋待辦事項
       * 根據待辦事項名稱
       * 根據專案篩選
       * 根據專案篩選之後，在搜尋待辦事項  
&emsp;&emsp;使用的技術、版本如下：
  * vue&emsp;^2.6.11
  * vue-router&emsp;^3.1.6
  * vuex&emsp;^3.1.3
  * vuetify&emsp;^2.2.11
  * pug&emsp;^2.0.4
  * uuid&emsp;^7.0.3
  * plop&emsp;^2.6.0&emsp;(方便快速建立檔案Template)
  * Localforage&emsp;^1.4.2&emsp;(為了在瀏覽器儲存資料，但因為indexedDB的非同步處理較為繁瑣，因此使用這套件快速開發)
## 心得
&emsp;&emsp;在開發初期，花了很多時間思考如何開始寫，並不是如何寫測試程式，而是寫測試案例，常煩惱哪些我漏測了，而哪些我又多測了，花了許多時間上網瀏覽這方面的文章，但是越看越沒譜，後來索性先不理會這一塊，有點杞人憂天，不如把它放到下一階段，等未來自己成長了，說不定問題也解了，所以後面的心力開始花在構思Component扮演的角色上，像是TodoItem，釐清這個Component只需負責顯示一個Checkbox、文字，以及點擊時需彈出Modal顯示明細，因此測試案例圍繞著這些功能。在執行失敗和完成能符合測試的最基本的程式碼當中往返不斷，因為Vue比較不熟悉，時常碰到測試失敗，但實際上執行是會成功的窘境;或者是開發初期為了降低測試的事前準備，大多使用shallowMount去進行部分渲染，但在後來為了UI調整HTML架構，測試卻都掛了，原因是因為原本dom可能在第一層，後來被搬進深層去，造成shallowMount無法抓到原本的dom，因此花了不少時間在補這個坑。  
&emsp;&emsp; 整個專案開發下來，花的時間比不寫測試要來得多些，不過因為我對測試和Vue都沒有十分熟悉，加上判斷測試案例的經驗不足，所以我覺得不能以此判斷寫測試對專案就是會浪費時間，不過我可以大聲的說未來我對此專案進行功能的修改，將可以大大減少開發時間，有種先苦後甘的感覺，除此之外，我也不是鼓勵大家全部改成ＴＤＤ開發，只是我覺得ＴＤＤ提供一種開發的思維去編寫程式，有了這種思維，即使沒有真的寫測試，我覺得撰寫程式的能力肯定也會有所提升。最後，雖然有些測試或是Vue的寫法不是很好，但整體下來我個人覺得收穫蠻大的，總結下列幾點，  
  1. 減少花在操作功能的時間  
     &emsp;因為有寫測試的關係，可以在run server前，大幅降低bug的機率
  2. 重構的不確定性降低  
     &emsp;重構後只要再次執行涉及檔案的測試，就可以有一定信心確保這次重構在一定成功率
  3. 程式耦合度降低  
     &emsp;組件間各司其職，變成靈活性增加，像是call api，因為Vue的便利性，鮮少看到Vue專案獨立拉出成一隻檔案統一管理，也可能是我閱歷不足，不過當我拉成一隻檔案統一管理，日後要將indexedDB換成實際後端街口，也不會因為api散落各處，造成改動一堆檔案的問題
  4. 組建的功能明確
     &emsp;協作者或未來的自己都可以透過測試案例的敘述，大概了解這個component的職責，降低了交接的成本
  5. 減少潛在Bug  
     &emsp;有時候人為操作功能，並不定會遍歷程式執行所有可能，容易潛伏Bug，不過測試寫得夠齊全的話，就能減少這種可能性發生
 
## 下載
  執行下列指令，或直接瀏覽[Demo](https://dingq84.github.io/vue-todolist/)
  <pre>
    git clone https://github.com/dingq84/vue-todolist.git
    cd vue-todolist
    yarn install
    yarn serve
  </pre>
