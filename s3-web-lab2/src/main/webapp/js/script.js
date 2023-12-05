let result_table_element_id = 1;
let result_table = $("#result-table");
let current_button;
let x_button;
let R_button;

function areaCheckGetRequest(data, redirectToResult) {
    $.ajax({
        type: "GET",
        url: "/s3-web-lab2/controller",
        async: false,
        data: data,
        success: function (responseData) {
            console.log(
                `response.x: ${responseData.x}, response.y: ${responseData.y}, response.R: ${responseData.R},\n` +
                    `response.collision: ${responseData.collision}, response.execTime: ${responseData.executionTime}, response.time: ${responseData.time}`
            );
            if (redirectToResult) {
                window.location.href = "./result.jsp";
            } else {
                console.log("successful request");
                const content = `<tr>
                    <td>${responseData.x}</td>
                     <td>${responseData.y}</td>
                     <td>${responseData.R}</td>
                     <td>${responseData.collision}</td>
                     <td>${responseData.executionTime}s</td>
                     <td>${responseData.time}</td>
                     </tr>`;
            result_table.append(content);
            result_table_element_id += 1;
            }
        },
        error: function (xhr, textStatus, error) {
            console.log(
                "readyState: " +
                    xhr.readyState +
                    "\n" +
                    "responseText: " +
                    xhr.responseText +
                    "\n" +
                    "status: " +
                    xhr.status +
                    "\n" +
                    "text status: " +
                    textStatus +
                    "\n" +
                    "error: " +
                    error
            );
        },
    });
}

function clearHistoryRequestServlet(){
    $.ajax({
        url: "/s3-web-lab2/clearHistory",
        type: "GET",
        success: function (data) {
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        },
    });
}

function loadHistory() {
    $.ajax({
        url: "/s3-web-lab2/loadHistory",
        type: "GET",
        dataType: "json",
        success: function (data) {
            // $("#result-div").empty();
            $.each(data, function (index, responseData) {
                AddPointNormalized(responseData.x, responseData.y, responseData.R);
                const content = `<tr>
                     <td>${responseData.x}</td>
                     <td>${responseData.y}</td>
                     <td>${responseData.R}</td>
                     <td>${responseData.collision}</td>
                     <td>${responseData.executionTime}s</td>
                     <td>${responseData.time}</td>
                     </tr>`;
                $("#result-table").append(content);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        },
    });
}

function validate(x, y, R) {
    if (4 < x || x < -4) {
        console.log("X out of area");
        return false;
    }
    if (3 < y || y < -3) {
        console.log("Y out of area");
        return false;
    }
    if (R < 1 || 3 < R) {
        console.log("R out of area");
        return false;
    }
    return true;
}

function setColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.addClass(className);
}

function removeColorClick(elementId, className) {
    let element = $(`#${elementId}`);
    element.removeClass(className);
}

function changeColorSelect(buttonId) {
    let button = $(`#${buttonId}`);
    console.log(`current_button_id: ${current_button}`);
    if (current_button) {
        if (x_button && button.attr(`class`) === "x_val") {
            x_button.removeClass("green");
            x_button = button;
        }
        if (R_button && button.attr(`class`) === "R_val") {
            R_button.removeClass("green");
            R_button = button;
        }
    }
    button.addClass("green");
    current_button = button;
}

function showError(msg, delay) {
    error_div.innerText = msg;

    setTimeout(function () {
        error_div.innerText = "";
    }, delay);
}

$(document).ready(function () {
    loadHistory();

    $("#clear-table").click(function () {
        sessionStorage.clear();
        const content = `<th width="16.6%">X</th>
                        <th width="16.6%">Y</th>
                        <th width="16.6%">R</th>
                        <th width="16.6%">res</th>
                        <th width="16.6%">execution time</th>
                        <th width="16.6%">time</th>`;
        result_table.html(content);
        setColorClick("clear-table", "green");
        setTimeout(function () {
            removeColorClick("clear-table", "green");
        }, 250);
        clearHistoryRequestServlet();
    });

    $(".x_val").click(function (event) {
        x_button = $(this);
        changeColorSelect($(this).attr("id"));
    });

    $(".R_val").click(function (event) {
        R_button = $(this);
        changeColorSelect($(this).attr("id"));
    });

    $("#input-form").submit(function (event) {
        event.preventDefault();
        const x = x_button.val();
        const y = $("input[name='y_field']").val();
        const R = R_button.val();

        console.log(x, y, R);

        if (validate(x, y, R)) {
            areaCheckGetRequest({ x: x, y: y, R: R }, true);
        } else {
            showError(
                "Проверьте корректность введенных значений!\nx ∈ [-4; 4]\ny ∈ [-3; 3]\nR ∈ [1; 3]",
                5000
            );
        }
    });

    $(".window svg").click(function (event) {
        let clicked_points = [];
        if (R_button) {
            const x = event.offsetX;
            const y = event.offsetY;

            const R = R_button.val();
            AddPoint(x, y);

            let normalizedX = (((x - 200) * 2 * R) / 300).toFixed(2);
            let normalizedY = (((200 - y) * 2 * R) / 300).toFixed(2);

            console.log(`x: ${x}, normX: ${normalizedX}`);
            console.log(`y: ${y}, normY: ${normalizedY}`);
            console.log(clicked_points[clicked_points.length - 1]);

            areaCheckGetRequest({ x: normalizedX, y: normalizedY, R: R }, true);
        } else {
            showError("Укажите параметр R!", 5000);
        }
    });
});

function AddPointNormalized(x, y, R){
    x = x * 300 / 2 / R + 200;
    y = (y * 300 / 2 / R - 200) * -1;
    AddPoint(x, y)
}

function AddPoint(x, y){
    let point = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
    point.setAttribute("r", "3");
    point.setAttribute("fill", "blue");

    $("svg").append(point);
}
