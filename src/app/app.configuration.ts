// To configur service URL and msg for global uses.

//proxy mode
// Set proxyMode = true then application will work on browser
// Set proxyMode = false it will work on device

let proxyMode: Boolean = true;
var apiEnd = proxyMode ? "/api/" : 'https://www.itat.gov.in/judicialapi/';

export const apiURL = Object.freeze({
    //base: 'http://119.226.207.84/demoitat/judicialapi/',
    // base: "http://164.100.58.114/judicialapi/",
    
    // base:"https://www.itat.gov.in/judicialapi/",
    base: apiEnd,
    caseStatusSearchResult: "casestatus",
    causeSearchResult: "causeSearchResult.json",
    benchProcessingSearchResult: "displaynotice",
    caseDetail: "caseDetail.json",
    causeListSpecial: "causeListSpecial.json",
    bookmarkCases: "bookmarkCase.json",
    tribunalOrders: "tribunalorders",
    caseStatusDetail: "casestatusdetail",
    bench: "bench",
    appeal: "appealtype",
    fillingYear: "year",
    special: "special",
    appealType: "appealtype",
    regular: "regular",
    hearingBench: "hearingbench", //post
    author: "authoroforder",
    hearingBenchType: "hearingbenchtype",
    hearingBenchReg: "hearingbenchregular",
    judgeList: "member",
    judgeListAdditional: "memberand",
    noticeBoard: "home", //post
    contactPage : "contact",
    term : "terms",
    about : "aboutitat",
    tribunal : "branchtrubnal",
    president : "aboutpresident"
});

export var msg = {
    noResult: "No result found",
    wait: "Please wait searching...",
    svcFailedMsg: "",
    svcFailed: {
        timeOut: "Server is not responding. Please try after some time.",
        fail: "Service is not   Responding. please try after some time.",
        parserError: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0012.",
        notFound: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0013.",
        abort: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0014.",
        error: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0015. <div class='loaderIcon' style='float:right;'></div>",
        internalServerError: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0016.",
        badRequest: "Currently Server is not responding. Please try after some time. <br /><br />Error Code: X0017.",
        other: "Service is not able to fetch data."
    }
};


