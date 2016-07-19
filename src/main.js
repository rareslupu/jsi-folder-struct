const folders ={
  directories: [
    {
      type: 'dir',
      name: 'app',
      children: [
        {
          type: 'file',
          name: 'index.html'
        },
        {
          type: 'dir',
          name: 'js',
          children: [
            {
              type: 'file',
              name: 'main.js'
            },
            {
              type: 'file',
              name: 'app.js'
            },
            {
              type: 'file',
              name: 'misc.js'
            },
            {
              type: 'dir',
              name: 'vendor',
              children: [
                {
                  type: 'file',
                  name: 'jquery.js'
                },
                {
                  type: 'file',
                  name: 'underscore.js'
                }
              ]
            }
          ]
        },
        {
          type: 'dir',
          name: 'css',
          children: [
            {
              type: 'file',
              name: 'reset.css'
            },
            {
              type: 'file',
              name: 'main.css'
            }
          ]
        }
      ]
    }
  ]
}

let foldersHTML=''; //store html content for displaying json object sturcutre
let newObj=[];
let children;
/*
 function take as param a json object and form html content to be displayed
 */
function generateHTMLContent(obj)
{
  //if it is a directory, add folder structure
  if(obj.type=='dir'){
    foldersHTML+='<li class="folder-item">'+obj.name+'</li>';
  }

  //if it is a file, add file structure
  if(obj.type=='file'){
    foldersHTML+='<li class="file-item">'+obj.name+'</li>';
  }

  //if object has subfiles add subfiles wrapper
  if(obj.hasOwnProperty("children")){
    foldersHTML+='<li class="folder-wrapper">';
    foldersHTML+='<ul class="folder-container">';
  }

  //do same thing for his chidrens
  for (var key in obj)
  {
    if (typeof obj[key] == "object" && obj[key] !== null){
      generateHTMLContent(obj[key]);
    }
  }

  //after processing childrens close wrapper tags
  if(obj.hasOwnProperty("children")){
    foldersHTML+='</ul>';
    foldersHTML+='</li>';
  }
}


/*
function takes user input on keystroke and set data to be displayed
 */
function displayTree(word) {

  foldersHTML='';   //reset html content
  newObj=[];
  children='';
  filterJSON(folders,word); //filter json object based on input word

  generateHTMLContent(newObj);   //form new html content

  document.getElementById("folders").innerHTML=foldersHTML;
}

//on page load display all data
displayTree('');


function filterJSON(obj, searchValue)
{
  if(obj.name && (obj.name.indexOf(searchValue) >-1)){
      newObj.push(obj);
      return
  }

  children=obj.children;

    for (var key in obj)
    {
      if (typeof obj[key] == "object" && obj[key] !== null){
        filterJSON(obj[key],searchValue);
      }
    }

}
