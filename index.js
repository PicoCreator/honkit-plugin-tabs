// Original Dependencies (all removed)
//-------------------------------------------------
// var _ = require('lodash');
// var markdown = require('gitbook-markdown');

// Added Global anti block collision counter
//-------------------------------------------------
var blockCount = 0;

module.exports = {
    website: {
        assets: "./assets",
        js: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
            "tabs.js"
        ],
        css: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
            "tabs.css"
        ]
    },
    blocks: {
        tabs: {
            blocks: ['tab','endtab'],
            process: async function (block) {
                var tabList = "<ul class='nav nav-tabs' role='tablist'>";
                var classData = "active";

                var tabContent = "<div class='tab-content'>";
                var activeState = 'active';

                // Original line
                //-------------------------------------------------
                // var tabIndex = 1 + _.random(1000);

                // Updated line
                //-------------------------------------------------
                // Get the book context (used later)
                let book = this.book;

                // Increment block count
                blockCount++;

                // I am guessing the Math.random()*1000 is to prevent collision from multiple blocks
                var tabIndex = 1 + parseInt( Math.random() * 100 ) + blockCount * 1000;
                //-------------------------------------------------

                // Original line
                //-------------------------------------------------
                // _.forEach(block.blocks, function (b) {

                // Updated line
                //-------------------------------------------------
                for(let i=0; i<block.blocks.length; ++i) {
                    let b = block.blocks[i];

                    if(b.kwargs.title){
                        var tabId = "tab-" + tabIndex;
                        var title = b.kwargs.title || tabId;

                        tabList += `<li role="presentation" class="${classData}"><a href="#${tabId}" aria-controls="${tabId}" role="tab" data-toggle="tab">${title}</a></li>`;
                        classData = "";

                        // Original line
                        //-------------------------------------------------
                        //var markup = markdown.page(b.body).content;

                        // Updated line
                        //-------------------------------------------------
                        var markup = await book.renderBlock('markdown', b.body); 

                        tabContent += `<div role="tabpanel" class="tab-pane ${activeState}" id="${tabId}">${markup}</div>`;
                        activeState = "";

                        tabIndex++;
                    }
                } //)
                tabList += "</ul>";
                tabContent += "</div>";
                return "<div class='markdown-tabs'>"+tabList + tabContent+"</div>";
            }
        }
    }
};
