# Vue Todolist

## 前言  
#### &emsp;&emsp;最近在整理Javascript testing的筆記，雖然接觸測試這一塊已經一年左右，但有很多測試的事情都沒有搞得很清楚，包含測試相關的功能和測試的想法等等，而且平時鮮少撰寫測試，因此測試對我來說一直是一個灰色地帶，說不上熟練也不是完全不會。
#### &emsp;&emsp;最近剛好開始學習Vue，因自己之前已經使用React一段時間，兩者有部分相似的地方，因此門檻沒有很高，而且剛好看了Sarah Dayan的<a href="https://www.youtube.com/watch?v=DD1fEhcEzY8" target="_blank">Test driven development with Vue.js</a>影片，對於想實踐測試和學習Vue的我來說，簡直是量身定做，所以下定決心使用ＴＤＤ的開發方式來玩成這個專案，因為要練習的技術對我算是重大挑戰，所以挑選了做過無數遍的TodoList，由於第一次接觸Vue和TDD，踩了很多坑也有許多地方可以做得更好，關於這部分將留在心得的部分做說明。
## 功能
#### &emsp;&emsp;本次的TodoList的功能和大家熟悉的差不多，有以下：  
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
#### &emsp;&emsp;使用的技術、版本如下：
  * vue&emsp;^2.6.11
  * vue-router&emsp;^3.1.6
  * vuex&emsp;^3.1.3
  * vuetify&emsp;^2.2.11
  * pug&emsp;^2.0.4
  * uuid&emsp;^7.0.3
  * plop&emsp;^2.6.0&emsp;(方便快速建立檔案Template)
  * Localforage&emsp;^1.4.2&emsp;(為了在瀏覽器儲存資料，但因為indexedDB的非同步處理較為繁瑣，因此使用這套件快速開發)
## 心得

## 下載
  執行下列指令，或直接瀏覽<a href="https://dingq84.github.io/vue-todolist/" target="_blank">Demo</a>  
  <pre>
    git clone https://github.com/dingq84/vue-todolist.git
    cd vue-todolist
    yarn install
    yarn serve
  </pre>
