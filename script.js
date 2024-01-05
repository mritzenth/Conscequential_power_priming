// Power Priming script (require jQuery)
$("#answer477133X3X27").hide();

let round = 1;
const nb_of_rounds = 5;
let free_ticket = 7;
let participants = new Object();
let text;
const lang = "EN";
const min = 18;
const max = 67;
const replace_char = /[123456789:]+/;
const ticket_win_rate = 0.14; // Win rate of one ticket 

//create a round
const create_round = function() {
  free_ticket = 7;

  // Create game participants
  participants.obs = new Object();
  participants.obs.name = "Jane Doe";
  participants.obs.age = Math.floor(Math.random() * (max - min + 1) + min);

  participants.p_1 = new Object();
  participants.p_1.name = "Jane Doe";
  participants.p_1.age = Math.floor(Math.random() * (max - min + 1) + min);
  participants.p_1.tickets = 0;

  participants.p_2 = new Object();
  participants.p_2.name = "Jane Doe";
  participants.p_2.age = Math.floor(Math.random() * (max - min + 1) + min);
  participants.p_2.tickets = 0;

  participants.p_3 = new Object();
  participants.p_3.name = "Jane Doe";
  participants.p_3.age = Math.floor(Math.random() * (max - min + 1) + min);
  participants.p_3.tickets = 0;

  participants.p_4 = new Object();
  participants.p_4.name = "Jane Doe";
  participants.p_4.age = Math.floor(Math.random() * (max - min + 1) + min);
  participants.p_4.tickets = 0;

  participants.p_5 = new Object();
  participants.p_5.name = "Jane Doe";
  participants.p_5.age = Math.floor(Math.random() * (max - min + 1) + min);
  participants.p_5.tickets = 0;

  // Generate the image link

  const imgs = [];
  for (let i = 1; i <= 6; i++) {
    let s = Math.random() > 0.5 ? "F" : "M";
    let n = Math.floor(Math.random() * 40 + 1);
    let img = s+n;
    // Exclude images already in array and non existing src
    while (imgs.includes(img) || img === "F11" || img === "F40") {
      s = Math.random() > 0.5 ? "F" : "M";
      n = Math.floor(Math.random() * 40 + 1);
      img = s+n;
    }

    if (i < 6) {
      $("#p_" + i + "_pic").attr("src","/upload/surveys/583851/images/profile_pic/" + img + ".png"); 
    } else {
      $("#obs_pic").attr("src","/upload/surveys/583851/images/profile_pic/" + img + ".png");
    } 
    imgs.push(img);
  }

  // Get the locale
  $.getJSON("/upload/surveys/583851/locale/locale.json", function(data) {
    lang === "EN" ? text = data.EN : lang === "FR" ? text = data.FR : text = data.DE;
    $("#validate_btn").val(text.validate_btn);
    $(".player_tickets_add").val(text.player_tickets_add);
    $(".player_tickets_remove").val(text.player_tickets_remove);
    $("#obs_age").html(text.age.replace(replace_char, participants.obs.age));
    $("#p_1_age").html(text.age.replace(replace_char, participants.p_1.age));
    $("#p_2_age").html(text.age.replace(replace_char, participants.p_2.age));
    $("#p_3_age").html(text.age.replace(replace_char, participants.p_3.age));
    $("#p_4_age").html(text.age.replace(replace_char, participants.p_4.age));
    $("#p_5_age").html(text.age.replace(replace_char, participants.p_5.age));
    update_values();
  });


  // Get the name
  $.getJSON("/upload/surveys/583851/database/Names.json", function(data) {
    let i = 0;
    imgs.forEach(img => {
      let name;
      i++;
      let keys;
      if (img.substring(0,1) === "M"){
        keys = Object.keys(data.M);
        name = data.M[ keys.length * Math.random() << 0].name;
      } else {
        keys = Object.keys(data.F);
        name = data.F[ keys.length * Math.random() << 0].name;
      }
      name = name.charAt(0) + name.substring(1).toLowerCase();
      if (i < 6) {
        $("#p_" + i + "_name").html(name);
        participants["p_" + i].name = name;
      } else {
        $("#obs_name").html(name);
        participants["obs"].name = name;
      } 
    });
  });
  $("#validate_btn").show();
}

create_round();


const update_values = function() {
  $("#round_infos").html(text.round_infos.replace(replace_char, round).replace("*", nb_of_rounds));
  $("#obs_infos").html(text.obs_infos.replace(replace_char, free_ticket));
  $("#p_1_t_number").html(participants.p_1.tickets);
  $("#p_2_t_number").html(participants.p_2.tickets);
  $("#p_3_t_number").html(participants.p_3.tickets);
  $("#p_4_t_number").html(participants.p_4.tickets);
  $("#p_5_t_number").html(participants.p_5.tickets);
  if (free_ticket > 0) {
    $("#validate_btn").hide();
  } else {
    $("#validate_btn").show();
  }
}

// Set the buttons actions
$("#p_1_t_remove").click(function(){
  if (participants.p_1.tickets > 0) {
    participants.p_1.tickets--;
    free_ticket++;
    update_values();
  }
});

$("#p_1_t_add").click(function(){
  if (free_ticket > 0) {
    participants.p_1.tickets++;
    free_ticket--;
    update_values();
  }
});

$("#p_2_t_remove").click(function(){
  if (participants.p_2.tickets > 0) {
    participants.p_2.tickets--;
    free_ticket++;
    update_values();
  }
});

$("#p_2_t_add").click(function(){
  if (free_ticket > 0) {
    participants.p_2.tickets++;
    free_ticket--;
    update_values();
  }
});


$("#p_3_t_remove").click(function(){
  if (participants.p_3.tickets > 0) {
    participants.p_3.tickets--;
    free_ticket++;
    update_values();
  }
});

$("#p_3_t_add").click(function(){
  if (free_ticket > 0) {
    participants.p_3.tickets++;
    free_ticket--;
    update_values();
  }
});


$("#p_4_t_remove").click(function(){
  if (participants.p_4.tickets > 0) {
    participants.p_4.tickets--;
    free_ticket++;
    update_values();
  }
});

$("#p_4_t_add").click(function(){
  if (free_ticket > 0) {
    participants.p_4.tickets++;
    free_ticket--;
    update_values();
  }
});


$("#p_5_t_remove").click(function(){
  if (participants.p_5.tickets > 0) {
    participants.p_5.tickets--;
    free_ticket++;
    update_values();
  }
});

$("#p_5_t_add").click(function(){
  if (free_ticket > 0) {
    participants.p_5.tickets++;
    free_ticket--;
    update_values();
  }
});

// Draw the winners tickets
$("#validate_btn").click(function(){
  $("#validate_btn").hide();
  const winners = draw_winners();
  let winning_tickets = "";
  if (winners.length > 0) {
    winners.forEach(function (key) {
      if (winning_tickets !== "") winning_tickets = winning_tickets + " - ";
      winning_tickets = winning_tickets + text.winning_ticket.replace(":", Math.floor(Math.random()*10000)).replace("*", participants[key].name);
    });
  } else {
    winning_tickets = text.no_winners;
  }
  $("#winner").html(winning_tickets);

  reactions(winners);
  new_round(winners.length);
});


const draw_winners = function() {
  const res = [];
  for (const [key, value] of Object.entries(participants)) {
    if (key !== "obs")
    {
      for (let i = 0; i<value.tickets; i++) {
        if (Math.random() < ticket_win_rate) {
          res.push(key);
        }
      }
    }
  }
  return res;
}


const reactions = function(winners) {
  console.log(winners)
  if (winners.length > 0) {
    const thankful_player = Math.floor(Math.random()*winners.length);
    const thank_sentence = text.thanks[Math.floor(Math.random()*text.thanks.length)];

    $("#"+winners[thankful_player] + "_thanks_txt").html(thank_sentence);
    $("#"+winners[thankful_player] + "_thanks_txt").addClass("text_display");
  }
}

// Resetting the round
const new_round = function(win_nmb) {
  const timing = 5000 + (win_nmb * 1500); 
  setTimeout(function() {
    $(".thanks_text").removeClass("text_display");
    $("#winner").html("");
    if (round < nb_of_rounds) {
      create_round();
    } else {
      $("#round_infos").html("");
      $("#power_priming").hide();
      $("#finished").html(text.finished);
      $("#answer477133X3X27").val("validated");
    }
  }, timing);
  round ++;
}
