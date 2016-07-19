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

/*
 function take as param a json object and a string searchValue to filter
 json data to be displayed
 */
function eachRecursive(obj, searchValue)
{
  //if it is a directory, add folder structure
  if(obj.type=='dir' && (obj.name.indexOf(searchValue) >-1) ){
    foldersHTML+='<li class="folder-item">'+obj.name+'</li>';
  }

  //if it is a file, add file structure
  if(obj.type=='file' && (obj.name.indexOf(searchValue) >-1)){
    foldersHTML+='<li class="file-item">'+obj.name+'</li>';
  }

  //if object has subfiles add subfiles wrapper
  if(obj.hasOwnProperty("children" ) && (obj.name.indexOf(searchValue) >-1)){
    foldersHTML+='<li class="folder-wrapper">';
    foldersHTML+='<ul class="folder-container">';
  }

  //do same thing for his chidrens
  for (var key in obj)
  {
    if (typeof obj[key] == "object" && obj[key] !== null){
      eachRecursive(obj[key],searchValue);
    }
  }

  //after processing childrens close wrapper tags
  if(obj.hasOwnProperty("children") && (obj.name.indexOf(searchValue) >-1)){
    foldersHTML+='</ul>';
    foldersHTML+='</li>';
  }
}


/*
function takes user input on keystroke and set data to be displayed
 */
function filterTree(word) {

  foldersHTML='';   //reset html content

  eachRecursive(folders,word);   //filter json and form new html content

  document.getElementById("folders").innerHTML=foldersHTML;
}

//on page load display all data
filterTree('');
