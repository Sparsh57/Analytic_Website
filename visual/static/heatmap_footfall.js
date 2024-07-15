// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Define gender categories and initialize graph data storage
    var genders = ['female', 'male'];
    var genderdate_graph = [];

    // Populate the gender-date graph with data
    for (var genderIndex1 = 0; genderIndex1 < genders.length; genderIndex1++) {
        for (var dateIndex1 = 0; dateIndex1 < dates.length; dateIndex1++) {
            genderdate_graph.push([dates[dateIndex1], genders[genderIndex1], data[genderIndex1 * dates.length + dateIndex1]]);
        }
    }

    // Define colors for the bar charts
    var colors1 = ['#1cacac', '#ff8080'];

    // Configure options for the gender-date bar chart
    var genderdate_option = {
        animation: false,
        legend: { selectedMode: false },
        yAxis: { type: 'value' },
        xAxis: { type: 'category', data: dates },
        series: genders.map((gender, index) => ({
            name: gender,
            type: 'bar',
            stack: 'total',
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}',
                color: 'white',
            },
            itemStyle: { color: colors1[index] },
            data: dates.map(date => genderdate_graph.find(item => item[0] === date && item[1] === gender)[2])
        }))
    };

    // Initialize and set options for the gender-date chart
    var gender_date_chart = echarts.init(document.getElementById('gender_date'));
    gender_date_chart.setOption(genderdate_option);

    // Define age groups and initialize graph data storage
    var age_group = ['15-25', '26-35', '36-45', '46-55', '56-65', '66-75'];
    var aggregatedData = {};
    var genderage_graph = [];

    // Aggregate data by gender and age groups
    gender_age.forEach((value, i) => {
        var genderIndex = Math.floor(i / age_group.length) % genders.length;
        var ageIndex = i % age_group.length;
        var key = age_group[ageIndex] + "-" + genders[genderIndex];
        aggregatedData[key] = (aggregatedData[key] || 0) + value;
    });

    // Populate the gender-age graph with aggregated data
    age_group.forEach(age => {
        genders.forEach(gender => {
            var key = age + "-" + gender;
            genderage_graph.push([age, gender, aggregatedData[key]]);
        });
    });

    // Define colors for the gender-age bar chart
    var colors2 = ['#1cacac', '#ff8080'];

    // Configure options for the gender-age bar chart
    var genderage_option = {
        animation: false,
        legend: { selectedMode: false },
        yAxis: { type: 'value' },
        xAxis: { type: 'category', data: age_group },
        series: genders.map((gender, index) => ({
            name: gender,
            type: 'bar',
            stack: 'total',
            label: {
                show: true,
                position: 'inside',
                formatter: '{c}',
                color: 'white',
            },
            itemStyle: { color: colors2[index] },
            data: age_group.map(age => genderage_graph.find(item => item[0] === age && item[1] === gender)[2])
        }))
    };

    // Initialize and set options for the gender-age chart
    var myChart = echarts.init(document.getElementById('gender_age'));
    myChart.setOption(genderage_option);

    // Initialize data aggregation for hour-age graph
    var agdata = {};
    var hourage_graph = [];

    // Aggregate data by hours and age groups
    hourage.forEach((value, i) => {
        var hourIndex = Math.floor(i / age_group.length) % hours.length;
        var ageIndex = i % age_group.length;
        var key = hours[hourIndex]+ "-" + age_group[ageIndex];
        agdata[key] = (agdata[key] || 0) + value;
    });

    // Populate the hour-age graph with aggregated data
    hours.forEach(hour => {
        age_group.forEach(age => {
            var key = hour + "-" + age;
            hourage_graph.push([hour, age, agdata[key]]);
        });
    });

    // Define aesthetic colors for the hour-age bar chart
    var aesthetic_colors = ['#422680', '#341671', '#280659', '#660F56', '#AE2D68', '#F54952'];

    // Configure options for the hour-age bar chart
    var hourage_option = {
        animation: true,
        legend: {
            data: age_group,
            textStyle: { color: '#999' }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { color: '#999' }
        },
        xAxis: {
            type: 'category',
            data: hours,
            axisLine: { lineStyle: { color: '#999' } },
            axisTick: { show: false },
            axisLabel: { color: '#999' }
        },
        series: age_group.map((age, index) => ({
            name: age,
            type: 'bar',
            stack: 'total',
            label: {
                show: false,
                position: 'inside',
                formatter: '{c}',
                color: 'white',
            },
            itemStyle: { color: aesthetic_colors[index] },
            data: hours.map(hour => hourage_graph.find(item => item[0] === hour && item[1] === age)[2])
        }))
    };

    // Initialize and set options for the hour-age chart
    var hourly_age = echarts.init(document.getElementById('hour_age'));
    hourly_age.setOption(hourage_option);

    // Initialize data aggregation for hour-gender graph
    var gendata = {};
    var hourgender_graph = [];

    // Aggregate data by hours and genders
    hourgender.forEach((value, i) => {
        var hourIndex = Math.floor(i / genders.length) % hours.length;
        var genderIndex = i % genders.length;
        var key = hours[hourIndex]+ "-" + genders[genderIndex];
        gendata[key] = (gendata[key] || 0) + value;
    });

    // Populate the hour-gender graph with aggregated data
    hours.forEach(hour => {
        genders.forEach(gender => {
            var key = hour + "-" + gender;
            hourgender_graph.push([hour, gender, gendata[key]]);
        });
    });

    // Define aesthetic colors for the hour-gender bar chart
    var aesthetic_colors = ['#660F56', '#F54952'];

    // Configure options for the hour-gender bar chart
    var hourgender_option = {
        animation: true,
        legend: {
            data: genders,
            textStyle: { color: '#999' }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { color: '#999' }
        },
        xAxis: {
            type: 'category',
            data: hours,
            axisLine: { lineStyle: { color: '#999' } },
            axisTick: { show: false },
            axisLabel: { color: '#999' }
        },
        series: genders.map((gender, index) => ({
            name: gender,
            type: 'bar',
            stack: 'total',
            label: {
                show: false,
                position: 'inside',
                formatter: '{c}',
                color: 'white',
            },
            itemStyle: { color: aesthetic_colors[index] },
            data: hours.map(hour => hourgender_graph.find(item => item[0] === hour && item[1] === gender)[2])
        }))
    };

    // Initialize and set options for the hour-gender chart
    var hourly_gender = echarts.init(document.getElementById('hour_gender'));
    hourly_gender.setOption(hourgender_option);

    // Initialize data storage for heatmap
    var heatmapData = [];

    // Function to get the day of the week from a date
    function getDayOfWeek(dateStr) {
        const date = new Date(dateStr);
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days[date.getDay()];
    }

    // Update the dates array to include the day of the week and reverse the array
    var updatedDates = dates.map(date => {
        const dayOfWeek = getDayOfWeek(date);
        return `${date} (${dayOfWeek})`;
    }).reverse();

    // Populate the heatmap data with footfall data
    dates.forEach((_, dateIndex3) => {
        hours.forEach((_, hourIndex) => {
            heatmapData.push([hourIndex, dateIndex3, footfallData[dateIndex3 * 10 + hourIndex]]);
        });
    });

    // Adjust the heatmap data to match the reversed dates
    heatmapData = heatmapData.map(dataPoint => {
        dataPoint[1] = dates.length - 1 - dataPoint[1];
        return dataPoint;
    });

    // Configure options for the heatmap
    var option_heatmap = {
        tooltip: {
            position: 'bottom',
            formatter: params => `${dates[params.value[1]]}: ${params.value[2]}`
        },
        animation: false,
        grid: { height: '70%', y: '10%' },
        xAxis: {
            type: 'category',
            data: hours,
            splitArea: { show: true },
            splitLine: { show: true },
            axisLabel: { interval: 0, textStyle: { color: 'black' } }
        },
        yAxis: {
            type: 'category',
            data: updatedDates,
            splitArea: { show: true },
            splitLine: { show: true }
        },
        visualMap: {
            min: 0,
            max: Math.max(...footfallData),
            calculable: true,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            bottom: '1%',
            pieces: [
                { min: 1, max: 200, label: '1-200', color: '#dedeff' },
                { min: 201, max: 400, label: '201-400' },
                { min: 401, max: 600, label: '401-600' },
                { min: 601, max: 800, label: '601-800' },
                { min: 801, max: 1000, label: '801-1000' }
            ],
            inRange: { color: ['white', 'blue'] },
            show: true
        },
        series: [{
            name: 'Footfall',
            type: 'heatmap',
            data: heatmapData,
            emphasis: {
                itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0, 0, 0, 0.8)', opacity: 0.8 },
                label: { show: true, color: 'black' }
            },
            label: { show: true, formatter: params => params.value[2], color: 'black' }
        }],
    };

    // Initialize and set options for the heatmap chart
    var heatmapChart = echarts.init(document.getElementById('footfall_heatmap'));
    heatmapChart.setOption(option_heatmap);

    // Event listener for mouseover event on heatmap
    heatmapChart.on('mouseover', function (params) {
        if (params.componentType === 'series' && params.seriesType === 'heatmap') {
            var xAxisIndex = params.value[0];
            heatmapChart.setOption({
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        formatter: (value, index) => index === xAxisIndex ? `{a|${value}}` : value,
                        rich: { a: { backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: [2, 5], borderRadius: 3 } },
                    }
                },
            });
            heatmapChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        }
    });

    // Event listener for mouseout event on heatmap
    heatmapChart.on('mouseout', function (params) {
        if (params.componentType === 'series' && params.seriesType === 'heatmap') {
            heatmapChart.setOption({
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        formatter: value => value,
                        textStyle: { color: 'black' }
                    }
                }
            });
        }
    });

    // Configure options for the date-hour line chart
    datehour_option = {
        tooltip: { trigger: 'axis' },
        grid: { containLabel: true },
        xAxis: { type: 'category', boundaryGap: false, data: hours },
        yAxis: { type: 'value', interval: 75, max: 900 },
        series: dates.map(date => {
            var seriesData = hours.map((_, hourIndex) => {
                var value = footfallData.find((item, index) => index % hours.length === hourIndex && Math.floor(index / hours.length) === dates.indexOf(date));
                return value !== undefined && value > 1 ? value : null;
            });
            return { name: date, type: 'line', smooth: true, data: seriesData };
        }),
        legend: { data: dates, bottom: '1%' },
    };

    // Initialize and set options for the date-hour line chart
    var stackChart = echarts.init(document.getElementById('stack_chart'));
    stackChart.setOption(datehour_option);

    // Aggregate data for the age pie chart
    var ageCounts = new Array(age_group.length).fill(0);
    ages.forEach((age, i) => ageCounts[i % age_group.length] += age);

    // Create age data for the pie chart
    var age_data = age_group.map((age, i) => ({ name: age, value: ageCounts[i] }));

    // Configure options for the age pie chart
    var age_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: age_group
        },
        series: [{
            name: 'Age Groups',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: age_data,
            label: { color: 'rgb(0, 0, 0)' },
            labelLine: {
                lineStyle: { color: 'rgb(0, 0, 0)' },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: () => Math.random() * 200,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // Initialize and set options for the age pie chart
    var agepie = echarts.init(document.getElementById('agepie'));
    agepie.setOption(age_option);

    // Aggregate heatmap data by hours
    var groupedArray = [];
    for (let i = 0; i < hours.length; i++) {
        const group = heatmapData.filter(item => item[0] === i);
        const sum = group.reduce((acc, val) => acc + val[2], 0);
        groupedArray.push([hours[i], sum]);
    }

    // Split data into forenoon and afternoon arrays
    var forenoon = [];
    var afternoon = [];
    groupedArray.forEach(d => {
        var hour = parseInt(d[0]);
        var isPM = d[0].includes('PM');
        if ((isPM == true && hour < 2) || (isPM == false && hour < 12) || (isPM == true && hour == 12)) {
            forenoon.push(d[1]);
        } else {
            afternoon.push(d[1]);
        }
    });

    // Configure options for the forenoon-afternoon bar chart
    var forAftOption = {
        animation: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: { data: ['Forenoon', 'Afternoon'] },
        xAxis: [{
            type: 'category',
            data: hours,
            axisLabel: { interval: 0, color: '#999' }
        }],
        yAxis: [{
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
        }],
        series: [{
                name: 'Forenoon',
                type: 'bar',
                data: forenoon.concat(new Array(hours.length - forenoon.length).fill(null)),
                barWidth: '80%',
                barGap: '-100%',
                itemStyle: { color: '#660F56' },
            },
            {
                name: 'Afternoon',
                type: 'bar',
                data: new Array(hours.length - afternoon.length).fill(null).concat(afternoon),
                barWidth: '80%',
                barGap: '-100%',
                itemStyle: { color: '#F54952' },
            }
        ]
    };

    // Initialize and set options for the forenoon-afternoon bar chart
    var forAftChart = echarts.init(document.getElementById('for_aft'));
    forAftChart.setOption(forAftOption);

    // Initialize arrays to store highest data values and corresponding information
    var highestdate = [];
    var highestgender = [];
    var highestage = [];
    var highestdatecount = [];
    var highestequality = [];
    var highestvariance = [];

    // Calculate highest date values and other statistics
    for (var i = 0; i < datesh.length; i++) {
        highestdate.push(footfall_Data.slice(i * hours.length, (i + 1) * hours.length).reduce((partialSum, a) => partialSum + a, 0));
        highestdatecount.push(
            footfall_Data.slice(i * hours.length, (i + 1) * hours.length).reduce((count, value) => count + (value === 0 ? 0 : 1), 0)
        );
        highestequality.push((datah[i + datesh.length] / datah[i]).toFixed(2));
        let mean = highestdate[i] / hours.length;
        let variance = footfallData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / hours.length;
        let standardDeviation = Math.sqrt(variance);
        highestvariance.push(standardDeviation);
    }

    // Helper function to get key by value from an object
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    // Calculate highest gender values
    for (var i = 0; i <= genders.length; i++) {
        highestgender.push(data.slice(i * dates.length, (i + 1) * dates.length).reduce((partialSum, a) => partialSum + a, 0));
    }

    // Calculate highest age values
    for (var i = 0; i <= age_group.length; i++) {
        highestage.push(agesh.slice(i * dates.length, (i + 1) * dates.length).reduce((partialSum, a) => partialSum + a, 0));
    }

    // Calculate gender ratios
    let genderRatios = [];
    genderage_graph.forEach((entry, index) => {
        let ageGroup = entry[0];
        let gender = entry[1];
        let count = entry[2];

        if (gender === 'male') {
            let femaleEntry = genderage_graph.find(e => e[0] === ageGroup && e[1] === 'female');
            if (femaleEntry) {
                let maleToFemaleRatio = count / femaleEntry[2];
                genderRatios.push(maleToFemaleRatio);
            }
        }
    });

    var peakFootfallDateTime = Math.max(...footfallData);
    var result = highestdate.map((num, index) => Math.round(num / highestdatecount[index]));

    // Create a list of statistical information
    const list = {
        highestFootfallDate: "<b>" + datesh[highestdate.indexOf(Math.max(...highestdate))] + "</b> with <b>" + Math.max(...highestdate) + "</b> footfalls",
        footfallTime: "<b>"+ getKeyByValue(Object.fromEntries(groupedArray), Math.max(...Object.values(Object.fromEntries(groupedArray))))+"</b> with <b>"+Math.max(...Object.values(Object.fromEntries(groupedArray)))+"</b> footfalls",
        highestFootfallGender: "<b>" + genders[highestgender.indexOf(Math.max(...highestgender))] + "</b> with <b>" + Math.max(...highestgender) + "</b> footfalls",
        mostCommonAgeGroup:  "<b>" + age_group[highestage.indexOf(Math.max(...highestage))] + "</b> with <b>" + Math.max(...highestage) + "</b> footfalls",
        peakFootfallDateTime: "<b>"+datesh[Math.floor(footfallData.indexOf(peakFootfallDateTime)/hours.length)]+"</b> at <b>"+hours[Math.floor(footfallData.indexOf(peakFootfallDateTime)%hours.length)]+ "</b> with <b>" + peakFootfallDateTime+ "</b> footfalls",
        worstFootfallDate: "<b>" + datesh[highestdate.indexOf(Math.min(...highestdate))] + "</b> with <b>" + Math.min(...highestdate) + "</b> footfalls",
        worstFootfallTime: "<b>"+ getKeyByValue(Object.fromEntries(groupedArray), Math.min(...Object.values(Object.fromEntries(groupedArray))))+"</b> with <b>"+Math.min(...Object.values(Object.fromEntries(groupedArray)))+"</b> footfalls",
        continuousFootfallDate: "<b>" + datesh[highestdatecount.indexOf(Math.max(...highestdatecount))] + "</b> with <b>" + Math.max(...highestdatecount) + "</b> hours having atleast 1 footfall",
        lowestOccurrenceDate: "<b>" + datesh[highestdatecount.indexOf(Math.min(...highestdatecount))] + "</b> with only <b>" + Math.min(...highestdatecount) + "</b> hours having atleast 1 footfall",
        bestPerHourFootfallRatioDate: "<b>" + datesh[result.indexOf(Math.max(...result))] + "</b> with <b>" + Math.max(...result) + "</b> per hour footfalls",
        worstPerHourFootfallRatioDate: "<b>" + datesh[result.indexOf(Math.min(...result))] + "</b> with <b>" + Math.min(...result) + "</b> per hour footfalls",
        mostBalancedGenderDistributionDate: "<b>" + datesh[highestequality.findIndex(item => String(item) === String(Math.min(...highestequality)))] + "</b> with <b>" + (Math.min(...highestequality)).toFixed(2) + ":1</b> male to female ratio",
        leastBalancedGenderDistributionDate: "<b>" + datesh[highestequality.findIndex(item => String(item) === String(Math.max(...highestequality)))] + "</b> with <b>" + Math.max(...highestequality) + ":1</b> male to female ratio",
        mostBalancedGenderDistributionAgeGroup: "<b>" + age_group[genderRatios.findIndex(item => String(item) === String(Math.min(...genderRatios)))] + "</b> with <b>" + Math.min(...genderRatios).toFixed(2) + ":1</b> male to female ratio",
        leastBalancedGenderDistributionAgeGroup: "<b>" + age_group[genderRatios.findIndex(item => String(item) === String(Math.max(...genderRatios)))] + "</b> with <b>" + (Math.max(...genderRatios)).toFixed(2) + ":1</b> male to female ratio",
        highestVarianceFootfallDate: "<b>" + datesh[highestvariance.indexOf(Math.max(...highestvariance))] + "</b> with <b>" + (Math.max(...highestvariance)).toFixed(2) + "</b> footfalls",
        lowestVarianceFootfallDate: "<b>" + datesh[highestvariance.indexOf(Math.min(...highestvariance))] + "</b> with <b>" + (Math.min(...highestvariance)).toFixed(2) + "</b> footfalls",
    };

    // Function to append statistical data to list items in the DOM
    function appendDataToListItems(list) {
        for (const key in list) {
            if (list.hasOwnProperty(key)) {
                const listItem = document.getElementById(key);
                if (listItem) {
                    listItem.innerHTML += list[key];
                }
            }
        }
    }

    // Append data to list items
    appendDataToListItems(list);

    // Populate dropdown with date options
    var dropdown = document.getElementById("dateOptions");
    dates.forEach(date => {
        var option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        dropdown.appendChild(option);
    });

    // Handle date selection change in the dropdown
    function handleDateSelection(date) {
        if (date === "") {
            footfallData = footfall_Data;
            data = datah;
            gender_age = genderage;
            dates = datesh;
            ages = agesh;
            hourage = hour_age;
            hourgender = hour_gender;
        } else {
            var dateIndex = datesh.indexOf(date);
            footfallData = footfall_Data.slice(dateIndex * hours.length, dateIndex * hours.length + hours.length);
            dates = [date];
            gender_age = genderage.slice(dateIndex * age_group.length * genders.length, dateIndex * age_group.length * genders.length + (age_group.length * genders.length));
            data = datah.slice(dateIndex, dateIndex + 1).concat(datah.slice(dateIndex + datesh.length, dateIndex + datesh.length + 1));
            ages = agesh.slice(dateIndex * age_group.length, dateIndex * age_group.length + age_group.length);
            hourage = hour_age.slice(dateIndex * age_group.length * hours.length, dateIndex * age_group.length * hours.length + (age_group.length * hours.length));
            hourgender = hour_gender.slice(dateIndex * genders.length * hours.length, dateIndex * genders.length * hours.length + (genders.length * hours.length));
        }

        // Update gender-date chart options
        genderdate_option.xAxis.data = dates;
        genderdate_option.series = genders.map((gender, index) => ({
            name: gender,
            data: dates.map(date => genderdate_graph.find(item => item[0] === date && item[1] === gender)[2])
        }));

        // Re-aggregate gender-age data
        aggregatedData = {};
        genderage_graph = [];
        gender_age.forEach((value, i) => {
            var genderIndex = Math.floor(i / age_group.length) % genders.length;
            var ageIndex = i % age_group.length;
            var key = age_group[ageIndex] + "-" + genders[genderIndex];
            aggregatedData[key] = (aggregatedData[key] || 0) + value;
        });

        // Populate gender-age graph with new data
        age_group.forEach(age => {
            genders.forEach(gender => {
                var key = age + "-" + gender;
                genderage_graph.push([age, gender, aggregatedData[key]]);
            });
        });

        // Update gender-age chart options
        genderage_option.series = genders.map((gender, index) => ({
            name: gender,
            data: age_group.map(age => genderage_graph.find(item => item[0] === age && item[1] === gender)[2])
        }));

        // Re-aggregate hour-age data
        var agdata = {};
        var hourage_graph = [];
        hourage.forEach((value, i) => {
            var hourIndex = Math.floor(i / age_group.length) % hours.length;
            var ageIndex = i % age_group.length;
            var key = hours[hourIndex]+ "-" + age_group[ageIndex];
            agdata[key] = (agdata[key] || 0) + value;
        });
        hours.forEach(hour => {
            age_group.forEach(age => {
                var key = hour + "-" + age;
                hourage_graph.push([hour, age, agdata[key]]);
            });
        });

        // Update hour-age chart options
        hourage_option.series = age_group.map((age, index) => ({
            name: age,
            data: hours.map(hour => hourage_graph.find(item => item[0] === hour && item[1] === age)[2])
        }));

        // Re-aggregate hour-gender data
        var gendata = {};
        var hourgender_graph = [];
        hourgender.forEach((value, i) => {
            var hourIndex = Math.floor(i / genders.length) % hours.length;
            var genderIndex = i % genders.length;
            var key = hours[hourIndex]+ "-" + genders[genderIndex];
            gendata[key] = (gendata[key] || 0) + value;
        });
        hours.forEach(hour => {
            genders.forEach(gender => {
                var key = hour + "-" + gender;
                hourgender_graph.push([hour, gender, gendata[key]]);
            });
        });

        // Update hour-gender chart options
        hourgender_option.series = genders.map((gender, index) => ({
            name: gender,
            data: hours.map(hour => hourgender_graph.find(item => item[0] === hour && item[1] === gender)[2])
        }));

        // Update heatmap chart options
        option_heatmap.yAxis.data = dates;
        option_heatmap.visualMap.max = Math.max(...footfallData);
        option_heatmap.series[0].data = [];
        dates.forEach((_, dateIndex3) => {
            hours.forEach((_, hourIndex) => {
                option_heatmap.series[0].data.push([hourIndex, dateIndex3, footfallData[dateIndex3 * 10 + hourIndex]]);
            });
        });

        // Update age pie chart options
        ageCounts = new Array(age_group.length).fill(0);
        ages.forEach((age, i) => ageCounts[i % age_group.length] += age);
        age_data = age_group.map((age, i) => ({ name: age, value: ageCounts[i] }));
        age_option.series[0].data = age_data;

        // Update forenoon-afternoon bar chart options
        var heatmapData = [];
        dates.forEach((_, dateIndex3) => {
            hours.forEach((_, hourIndex) => {
                heatmapData.push([hourIndex, dateIndex3, footfallData[dateIndex3 * 10 + hourIndex]]);
            });
        });
        var groupedArray = [];
        for (let i = 0; i < hours.length; i++) {
            const group = heatmapData.filter(item => item[0] === i);
            const sum = group.reduce((acc, val) => acc + val[2], 0);
            groupedArray.push([hours[i], sum]);
        }
        var forenoon = [];
        var afternoon = [];
        groupedArray.forEach(d => {
            var hour = parseInt(d[0]);
            var isPM = d[0].includes('PM');
            if ((isPM==true && hour < 2) || (isPM==false && hour < 12) || (isPM==true && hour ==12)) {
                forenoon.push(d[1]);
                afternoon.push(null);
            } else {
                afternoon.push(d[1]);
                forenoon.push(null);
            }
        });
        forAftOption.series[0].data = forenoon;
        forAftOption.series[1].data = afternoon;

        // Re-render charts with updated data
        forAftChart.setOption(forAftOption);
        agepie.setOption(age_option);
        gender_date_chart.setOption(genderdate_option);
        myChart.setOption(genderage_option);
        hourly_age.setOption(hourage_option);
        hourly_gender.setOption(hourgender_option);
        heatmapChart.setOption(option_heatmap);
    }

    // Add event listener for date selection dropdown
    dropdown.addEventListener('change', () => handleDateSelection(dropdown.value));
});
