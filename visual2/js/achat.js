function Requete(data, URL, method) {
    var result="";
    $.ajax({
      url:URL,
      type:method,
      contentType : "application/json",
      data :  JSON.stringify(data),
      async: false,
      success:function(data) {
         result = data; 
      }
   });
   return result;
};

function recuperer_cartes_vente(){
    url = "http://localhost:8081/market";
    var retour_requete = Requete("", url, "GET");
    for(i=0;i<retour_requete.length;i++){
        addCardToList(retour_requete[i].urlfamily,retour_requete[i].familyName,retour_requete[i].imgurl,retour_requete[i].name,retour_requete[i].description,retour_requete[i].hp,retour_requete[i].energy,retour_requete[i].attack,retour_requete[i].defence,retour_requete[i].price,retour_requete[i].id)
    }


}

$(document ).ready(function(){

    recuperer_cartes_vente()

});

function achat(id,price){
    url = "http://localhost:8081/buycard";
    $data = { 
        id_card : id,
        id_buyer : sessionStorage.getItem('id')    
    };
    var retour_requete = Requete($data, url, "POST");
    if (retour_requete == false) {
        alert("Vous n'avez pas assez de sous")
    }
    else sessionStorage.setItem('money',sessionStorage.getItem('money')-price);
    window.location.reload();
}

function affichage_carte(id){
    url = "http://localhost:8081/getcardbyid?id="+id;
    var retour_requete = Requete("", url, "GET");
    fillCurrentCard(retour_requete.urlfamily,retour_requete.familyName,retour_requete.imgurl,retour_requete.name,retour_requete.description,retour_requete.hp,retour_requete.energy,retour_requete.attack,retour_requete.defence,retour_requete.price,retour_requete.id_card)
}






function fillCurrentCard(imgUrlFamily,familyName,imgUrl,name,description,hp,energy,attack,defence,price){
    //FILL THE CURRENT CARD
    $('#cardFamilyImgId')[0].src=imgUrlFamily;
    $('#cardFamilyNameId')[0].innerText=familyName;
    $('#cardImgId')[0].src=imgUrl;
    $('#cardNameId')[0].innerText=name;
    $('#cardDescriptionId')[0].innerText=description;
    $('#cardHPId')[0].innerText=hp+" HP";
    $('#cardEnergyId')[0].innerText=energy+" Energy";
    $('#cardAttackId')[0].innerText=attack+" Attack";
    $('#cardDefenceId')[0].innerText=defence+" Defence";
    $('#cardPriceId')[0].innerText=price+" $";
};


function addCardToList(imgUrlFamily,familyName,imgUrl,name,description,hp,energy,attack,defence,price,id){
    
    content="\
    <td > \
    <img  class='ui avatar image clickable' src='"+imgUrl+"'> <span>"+name+" </span> \
   </td> \
    <td >"+description+"</td> \
    <td >"+familyName+"</td> \
    <td >"+hp+"</td> \
    <td >"+energy+"</td> \
    <td >"+attack+"</td> \
    <td >"+defence+"</td> \
    <td>"+price+"$</td>\
    <td>\
        <div class='ui vertical animated button' tabindex='0'>\
            <div class='hidden content' onclick='achat("+id.toString()+","+price+")'>Achat</div>\
    <div class='visible content'>\
        <i class='shop icon'></i>\
    </div>\
    </div>\
    </td>\
    ";
    
    $('#cardListId tr:last').after('<tr onclick = \"affichage_carte('+id.toString()+')\">'+content+'</tr>');
    
    
};