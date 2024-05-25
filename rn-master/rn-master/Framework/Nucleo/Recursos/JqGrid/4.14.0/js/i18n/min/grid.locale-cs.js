/**
 * @license jqGrid Czech Translation
 * Pavel Jirak pavel.jirak@jipas.cz
 * doplnil Thomas Wagner xwagne01@stud.fit.vutbr.cz
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b||window)),a(c),c}:a(jQuery)}(function(a){"use strict";var b={isRTL:!1,defaults:{recordtext:"Zobrazeno {0} - {1} z {2} záznamů",emptyrecords:"Nenalezeny žádné záznamy",loadtext:"Načítám...",pgtext:"Strana {0} z {1}",pgfirst:"First Page",pglast:"Last Page",pgnext:"Next Page",pgprev:"Previous Page",pgrecs:"Records per Page",showhide:"Toggle Expand Collapse Grid",savetext:"Ukládání..."},search:{caption:"Vyhledávám...",Find:"Hledat",Reset:"Reset",odata:[{oper:"eq",text:"rovno"},{oper:"ne",text:"nerovno"},{oper:"lt",text:"menší"},{oper:"le",text:"menší nebo rovno"},{oper:"gt",text:"větší"},{oper:"ge",text:"větší nebo rovno"},{oper:"bw",text:"začíná s"},{oper:"bn",text:"nezačíná s"},{oper:"in",text:"je v"},{oper:"ni",text:"není v"},{oper:"ew",text:"končí s"},{oper:"en",text:"nekončí s"},{oper:"cn",text:"obsahuje"},{oper:"nc",text:"neobsahuje"},{oper:"nu",text:"is null"},{oper:"nn",text:"is not null"}],groupOps:[{op:"AND",text:"všech"},{op:"OR",text:"některého z"}],addGroupTitle:"Add subgroup",deleteGroupTitle:"Delete group",addRuleTitle:"Add rule",deleteRuleTitle:"Delete rule",operandTitle:"Click to select search operation.",resetTitle:"Reset Search Value"},edit:{addCaption:"Přidat záznam",editCaption:"Editace záznamu",bSubmit:"Uložit",bCancel:"Storno",bClose:"Zavřít",saveData:"Data byla změněna! Uložit změny?",bYes:"Ano",bNo:"Ne",bExit:"Zrušit",msg:{required:"Pole je vyžadováno",number:"Prosím, vložte validní číslo",minValue:"hodnota musí být větší než nebo rovná ",maxValue:"hodnota musí být menší než nebo rovná ",email:"není validní e-mail",integer:"Prosím, vložte celé číslo",date:"Prosím, vložte validní datum",url:"není platnou URL. Vyžadován prefix ('http://' or 'https://')",nodefined:" není definován!",novalue:" je vyžadována návratová hodnota!",customarray:"Custom function mělá vrátit pole!",customfcheck:"Custom function by měla být přítomna v případě custom checking!"}},view:{caption:"Zobrazit záznam",bClose:"Zavřít"},del:{caption:"Smazat",msg:"Smazat vybraný(é) záznam(y)?",bSubmit:"Smazat",bCancel:"Storno"},nav:{edittext:"",edittitle:"Editovat vybraný řádek",addtext:" ",addtitle:"Přidat nový řádek",deltext:"",deltitle:"Smazat vybraný záznam ",searchtext:"",searchtitle:"Najít záznamy",refreshtext:"",refreshtitle:"Obnovit tabulku",alertcap:"Varování",alerttext:"Prosím, vyberte řádek",viewtext:"",viewtitle:"Zobrazit vybraný řádek",savetext:"",savetitle:"Save row",canceltext:"",canceltitle:"Cancel row editing"},col:{caption:"Zobrazit/Skrýt sloupce",bSubmit:"Uložit",bCancel:"Storno"},errors:{errcap:"Chyba",nourl:"Není nastavena url",norecords:"Žádné záznamy ke zpracování",model:"Délka colNames <> colModel!"},formatter:{integer:{thousandsSeparator:" ",defaultValue:"0"},number:{decimalSeparator:".",thousandsSeparator:" ",decimalPlaces:2,defaultValue:"0.00"},currency:{decimalSeparator:".",thousandsSeparator:" ",decimalPlaces:2,prefix:"",suffix:"",defaultValue:"0.00"},date:{dayNames:["Ne","Po","Út","St","Čt","Pá","So","Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"],monthNames:["Led","Úno","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Pro","Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],AmPm:["do","od","DO","OD"],S:function(a){return a<11||a>13?["st","nd","rd","th"][Math.min((a-1)%10,3)]:"th"},srcformat:"Y-m-d",newformat:"d/m/Y",masks:{ShortDate:"n/j/Y",LongDate:"l, F d, Y",FullDateTime:"l, F d, Y g:i:s A",MonthDay:"F d",ShortTime:"g:i A",LongTime:"g:i:s A",YearMonth:"F, Y"}}}};a.jgrid=a.jgrid||{},a.extend(!0,a.jgrid,{defaults:{locale:"cs"},locales:{cs:a.extend({},b,{name:"čeština",nameEnglish:"Czech"}),"cs-CZ":a.extend({},b,{name:"čeština (Česká republika)",nameEnglish:"Czech (Czech Republic)"})}})});
//# sourceMappingURL=grid.locale-cs.js.map