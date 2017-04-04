function test() {
	var span, d = document, li, a, i, lis = d.getElementById('button-download').getElementsByTagName('li');
	for (i = 0; li = lis[i++]; ) {
		a = li.getElementsByTagName('a')[0];
		if (!a) { continue; }
		span = d.createElement('span');
		span.ctime=new Date();
		span.innerHTML = '...<img src="' + a.href + '" border="0" style="display:none;" width="1" height="1" onerror="testresult(this)" />';
		a.appendChild(span);
	}
};
function testresult(img) {
	var span = img.parentNode;
	var n = 'em';
	if (!testresult.isrun) { n = 'b'; testresult.isrun = true; }
	span.innerHTML = '<' + n + '>' + ((new Date() - span.ctime) / 1000).toFixed(2) + 's</' + n + '>';
};
var ran = Math.random();