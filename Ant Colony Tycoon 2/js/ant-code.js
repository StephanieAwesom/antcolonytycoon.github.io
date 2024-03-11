function hide_show_div(checkbox_id, div_id) {
    var checkbox = document.getElementById(checkbox_id)
    var div = document.getElementById(div_id)
    if (checkbox.checked === false) {
        div.style.display = "block"
    } else if (checkbox.checked === true) {
        div.style.display = "none"
    }
}

let colony_name_input = document.querySelector('#colony-name-input')
let colony_name = null

function submit_colony_name() {
    colony_name = colony_name_input.value
    if (colony_name === "") {
        colony_name = "Insert Colony Name"
    }

    document.title = "🐜 "+ colony_name +" 🐜"
    console.log("Title Changed: " + colony_name_input.value)
}

// should've made this & the ant jobs a class but I wasn't bothered
var total_resources = {"amount":0, "id":"#statistics-total-resources", "text":"🧰 Total Resources - "}
var leaves = {"name":"leaf", "amount":0, "id":"#statistics-leaves", "text":"🍃 Leaves - "}
var crumbs = {"name":"crumb", "amount":0, "id":"#statistics-crumbs", "text":"🍞 Crumbs - "}
var sticks = {"name":"stick", "amount":0, "id":"#statistics-sticks", "text":"🌳 Sticks - "}
var pebbles = {"name":"pebble", "amount":0, "id":"#statistics-pebbles", "text":"🪨 Pebbles - "}
var resources = [leaves, crumbs, sticks, pebbles]
var current_resource = ""

let gather_resource_text = document.querySelector('#gather-resource-text')
function gather_resource() {
    var select_resource_inputs = document.getElementsByName('select-resource')
    for (i = 0; i < select_resource_inputs.length; i++) {
        if (select_resource_inputs[i].checked === true) {
            current_resource = loop_array(resources, select_resource_inputs[i].value)
        }
    }

    total_resources.amount += 1
    current_resource.amount += 1
    console.log(current_resource.name)
    change_statistic(current_resource)
    gather_resource_text.innerHTML = "You got 1 "+ current_resource.name
}

function loop_array(array, selected_output) {
    for (i = 0; i < array.length; i++) {
        if (array[i].name === selected_output) {
            return array[i]
        }
    }
}

var total_ants = {"amount":0, "id":"#statistics-total-ants", "text":"🐜 Total Ants - "}
var unemployed_ants = {"name":"unemployed", "amount":0, "id":"#statistics-unemployed", "text":"🧍‍♂️ Unemployed Ants - "}
var chef_ants = {"name":"chef", "resource":crumbs, "amount":0, "id":"#statistics-chefs", "text":"👨‍🍳 Chef Ants - "}
var lumberjack_ants = {"name":"lumberjack", "resource":sticks, "amount":0, "id":"#statistics-lumberjacks", "text":"🪓 Lumberjack Ants - "}
var miner_ants = {"name":"miner", "resource":pebbles, "amount":0, "id":"#statistics-miners", "text":"⛏️ Miner Ants - "}
var jobs = [chef_ants, lumberjack_ants, miner_ants]
var current_job = ""

let tame_ant_text = document.querySelector('#tame-ant-text')
function tame_ant() {
    if (leaves.amount >= 5) {
        leaves.amount -= 5
        total_resources.amount -= 5
        unemployed_ants.amount += 1
        total_ants.amount += 1
        tame_ant_text.innerHTML = "You got an ant!"

        change_statistic(unemployed_ants)
        change_statistic(leaves)
    } else {
        tame_ant_text.innerHTML = "You don't have enough leaves..."
    }
}

function hire_ant() {
    var select_job = document.getElementById('select-job')
    current_job = loop_array(jobs, select_job.value)

    let hire_ant_text = document.querySelector('#hire-ant-text')
    if (unemployed_ants.amount > 0 && current_job.resource.amount >= 5) {
        unemployed_ants.amount -= 1
        current_job.amount += 1
        current_job.resource.amount -= 5
        total_resources.amount -= 5

        change_statistic(unemployed_ants)
        change_statistic(current_job)
        change_statistic(current_job.resource)

        hire_ant_text.innerHTML = "You spent 5 "+ current_job.resource.name +"s and got a "+ current_job.name
    } else {
        hire_ant_text.innerHTML = "You don't have enough "+ current_job.resource.name +" for a "+ current_job.name
    }
}

var ant_dollars = {"amount":0, "id":"#statistics-ant-dollars", "text":"💰 Ant Dollars - "}
let manual_labour_text = document.querySelector('#manual-labour-text')
function manual_labour() {
    if (chef_ants.amount > 0) {
        chef_ants.resource.amount += chef_ants.amount
        change_statistic(chef_ants.resource)
    }
    if (lumberjack_ants.amount > 0) {
        lumberjack_ants.resource.amount += lumberjack_ants.amount
        change_statistic(lumberjack_ants.resource)
    }
    if (miner_ants.amount > 0) {
        miner_ants.resource.amount += miner_ants.amount
        change_statistic(miner_ants.resource)
    }
    if (total_ants.amount > 0) {
        ant_dollars.amount += total_ants.amount - unemployed_ants.amount
        total_resources.amount += total_ants.amount
        change_statistic(ant_dollars)
        manual_labour_text.innerHTML = "You got "+ chef_ants.amount +" crumbs, "+ lumberjack_ants.amount +" sticks, "+ miner_ants.amount +" pebbles, and "+ ant_dollars.amount +" ant dollars."
    }
}

function change_statistic(current_object) {
    let stat_text = document.querySelector(current_object.id)
    stat_text.innerHTML = current_object.text + current_object.amount

    let stat_text_two = document.querySelector(total_resources.id)
    stat_text_two.innerHTML = total_resources.text + total_resources.amount

    let stat_text_three = document.querySelector(total_ants.id)
    stat_text_three.innerHTML = total_ants.text + total_ants.amount
}

function win_game() {
    if (ant_dollars.amount >= 10000) {
        location.href="you-win.html"
    }
}