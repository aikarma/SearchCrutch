﻿document.getElementById('a_0').addEventListener('click',CheckRedirect);		//谷歌
document.getElementById('a_1').addEventListener('click',CheckRedirect);		//谷歌复原
document.getElementById('a_2').addEventListener('click',CheckRedirect);		//百度
document.getElementById('a_3').addEventListener('click',CheckRedirect);		//必应
document.getElementById('a_4').addEventListener('click',CheckRedirect);		//雅虎
document.getElementById('a_5').addEventListener('click',CheckRedirect);		//搜狗
document.getElementById('a_6').addEventListener('click',CheckRedirect);		//有道

function CheckRedirect( )
{
	index = this.id.substr('a_'.length);
	redirect(index);
}

function redirect( index )
{
	chrome.tabs.getSelected(null,function(tab){ 
		q ='';
		if( localStorage["word"] )
			q = localStorage["word"] ;
		else
		{
			host = GetHost(tab.url);
			i_host = inHostArray(host) ;
			args = GetUrlParms(tab.url);
			if( -1 < i_host )
			{
				q = args[ searchselect_array[ searchhost_array[i_host][1] ][2] ];
				$('in_q').value = q;
			}
		}
		if(q)
			newurl = searchselect_array[index][1] + q;
		else
			newurl = searchselect_array[index][3];

		chrome.tabs.update( tab.id, {url:newurl}, function(tab){});//*/
	});
	chrome.extension.sendRequest({"tosearch": searchselect_array[index][0] }, function(response) {});
	SetNowLink( index );
}