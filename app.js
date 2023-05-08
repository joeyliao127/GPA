animation();
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});
lins_button();
//主程式
//formAttrs用來新建form
const formAttrs = {
  input1_Attrs: {
    type: "text",
    placeholder: "class category",
    class: "class-category",
    list: "opt",
  },
  input2_Attrs: {
    type: "text",
    placeholder: "class number",
    class: "class-number",
  },
  input3_Attrs: {
    type: "number",
    placeholder: "credits",
    class: "credits",
    min: "1",
  },

  select_Attrs: {
    name: "score",
    id: "score",
  },

  trash_Attrs: {
    class: "trash",
  },
  add_input1_attrs(input) {
    this.addAttrs(this.input1_Attrs, input);
  },
  add_input2_attrs(input) {
    this.addAttrs(this.input2_Attrs, input);
  },
  add_input3_attrs(input) {
    this.addAttrs(this.input3_Attrs, input);
  },

  add_select_attrs(select) {
    this.addAttrs(this.select_Attrs, select);
  },

  add_trash_attrs(trash) {
    this.addAttrs(this.trash_Attrs, trash);
  },
  //object.entries會用array的方式return兩個值，分別是key&value，forEach帶入兩個參數(key, value)，透過setAttribute加入屬性。
  addAttrs(attrs, input) {
    Object.entries(attrs).forEach(([key, value]) => {
      input.setAttribute(key, value);
    });
  },
};
//監聽addButton，如果被點選，裡面的button不會submit
let addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
  createForm();
  lins_button();
  remove_Form();
  creditsChange();
  getResult();
});

remove_Form();
creditsChange();
getResult();

//排序button
let sortUp = document.querySelector(".sort-ascending");
let sortDown = document.querySelector(".sort-descending");

sortUp.addEventListener("click", () => {
  let up = true;
  getNewForm(up);
  lins_button();
  remove_Form();
  creditsChange();
  updateGPA();
});

sortDown.addEventListener("click", () => {
  let down = false;
  getNewForm(down);
  lins_button();
  remove_Form();
  creditsChange();
  updateGPA();
});

function animation() {
  let image = document.querySelector(".image");
  let silder = document.querySelector(".silder");
  let wrapper = document.querySelector(".animation-wrapper");

  const Timeline = new TimelineMax();

  Timeline.fromTo(
    image,
    1,
    { height: "0%" },
    { height: "100%", ease: Power2.easeInOut }
  )
    .fromTo(
      image,
      1,
      { width: "80%" },
      { width: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
      silder,
      1,
      { x: "-100%" },
      { x: " 0%", ease: Power2.easeInOut },
      "-=1"
    )
    .fromTo(wrapper, 0.5, { opacity: "1" }, { opacity: "0" });

  window.setTimeout(() => {
    wrapper.style.pointerEvents = "none";
  }, 2500);
}
function createForm() {
  let mainForm = document.querySelector("section.main-form");
  let newForm = document.createElement("form");
  newForm.classList.add("form1");

  let newInput1 = document.createElement("input");
  formAttrs.add_input1_attrs(newInput1);

  let newInput2 = document.createElement("input");
  formAttrs.add_input1_attrs(newInput2);

  let newInput3 = document.createElement("input");
  formAttrs.add_input3_attrs(newInput3);

  let newSelect = document.createElement("select");
  formAttrs.add_select_attrs(newSelect);
  OptionAdd(newSelect);
  let newTrash = document.createElement("button");
  newTrash.classList.add("trash");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash");
  newTrash.appendChild(newItag);
  newForm.appendChild(newInput1);
  newForm.appendChild(newInput2);
  newForm.appendChild(newInput3);
  newForm.appendChild(newSelect);
  newForm.appendChild(newTrash);
  mainForm.appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
}
function OptionAdd(select) {
  optionList = [
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];
  for (let i = 0; i < optionList.length; i++) {
    let newOption = document.createElement("option");
    newOption.setAttribute("value", optionList[i]);
    newOption.innerText = optionList[i];
    select.appendChild(newOption);
  }
}
function updateGPA() {
  let final_score = document.getElementById("final-score");
  final_score.innerText = GPA();
}
function getResult() {
  // console.log("執行GetResult");
  let selection = document.querySelectorAll("#score");
  let final_score = document.getElementById("final-score");
  // let credits = document.querySelectorAll(".credits");
  selection.forEach((option) => {
    option.addEventListener("change", (e) => {
      color_change(option);
      updateGPA();
    });
  });
}
function color_change(selection) {
  if (selection.value == "A" || selection.value == "A-") {
    selection.style.backgroundColor = "lightgreen";
    selection.style.color = "black";
  }
  if (
    selection.value == "B+" ||
    selection.value == "B" ||
    selection.value == "B-"
  ) {
    selection.style.backgroundColor = "yellow";
    selection.style.color = "black";
  }
  if (
    selection.value == "C+" ||
    selection.value == "C" ||
    selection.value == "C-"
  ) {
    selection.style.backgroundColor = "orange";
    selection.style.color = "black";
  }
  if (
    selection.value == "D+" ||
    selection.value == "D" ||
    selection.value == "D-"
  ) {
    selection.style.backgroundColor = "red";
    selection.style.color = "black";
  }
  if (selection.value == "F") {
    selection.style.backgroundColor = "grey";
    selection.style.color = "black";
  }
}

function getScore(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function GPA() {
  // console.log("執行GPA");
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".credits"); //取得input number的數值，credits是一個nodelist，要用index取
  // console.log("測試2：", typeof 1);
  // console.log("測試3 isNaN：", isNaN(parseInt(credits[0].value)));
  let score = document.querySelectorAll("#score");
  let result = 0;
  let total_credits = 0;
  for (let i = 0; i < formLength; i++) {
    if (parseInt(credits[i].value) == 0) {
      window.alert("請輸入0以上的數字");
      break;
    }
    if (isNaN(parseInt(credits[i].value))) {
      // console.log("第", i, "個：", credits[i].value);
      // console.log("跳過", i + 1, "個", credits[i].value);
      continue;
    } else {
      // console.log("credits = ", parseInt(credits[i].value));
      // console.log("score = ", getScore(score[i].value));
      // console.log("result = ", result);
      // console.log("total_credits = ", total_credits);
      result += parseInt(credits[i].value) * getScore(score[i].value);
      total_credits += parseInt(credits[i].value);
    }
  }
  console.log("result/total =", result / total_credits);
  if (isNaN(result / total_credits)) {
    console.log("return 0");
    return (0.0).toFixed(2);
  } else {
    console.log("retunr score");
    return (result / total_credits).toFixed(2);
  }
}

function lins_button() {
  let button = document.querySelectorAll(".trash");
  button.forEach((input) => {
    input.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

function remove_Form() {
  let trash = document.querySelectorAll(".trash");
  trash.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click test");
      button.parentElement.removeAttribute("style");
      button.parentElement.style.animation = "scaleDown 0.5s ease forwards";
      setTimeout(() => {
        button.parentElement.remove();
        updateGPA();
      }, 500);
    });
  });
}

function formStorage(direction) {
  let form1 = document.querySelectorAll(".form1");
  let tempAllForm = [];
  form1.forEach((input) => {
    let score = getScore(input[3].value);
    let newArray = [
      score,
      [input[0].value, input[1].value, input[2].value, input[3].value],
    ];
    tempAllForm.push(newArray);
  });
  let dirc = tempAllForm.sort();

  if (direction) {
    return dirc.reverse();
  } else {
    return dirc;
  }
  //return "x"個form長度的array，form各自的value用object紀錄。
}
function getNewForm(direction) {
  let removeAll = document.querySelectorAll(".form1");
  let formLength = removeAll.length;
  let mina_form = document.querySelector(".main-form");
  let oldForm = formStorage(direction); //儲存舊表單的value
  // console.log("排序後的oldForm:", oldForm.sort());
  removeAll.forEach((input) => {
    input.remove();
  });
  // 1. 建立新表單
  // 2. 將新表單內的每一個元素加入原本的value
  for (let i = 0; i < formLength; i++) {
    createForm();
    let currentFormValue = oldForm[i][1];
    console.log("current:", currentFormValue);
    let newForm = document.querySelectorAll(".form1");
    for (let j = 0; j < newForm[i].length - 1; j++) {
      newForm[i][j].value = currentFormValue[j];
      // console.log("第", j, "遍");
    }
    // mina_form.appendChild(newForm[i]);
  }
}
function creditsChange() {
  let credits = document.querySelectorAll(".credits");
  credits.forEach((input) => {
    input.addEventListener("change", () => {
      updateGPA();
    });
  });
}
