function flashCopyMessage(el, msg) {
  el.textContent = msg;
  setTimeout(function() {
    el.textContent = "Copy";
  }, 1000);
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
    const copyBtn = document.createElement("a");
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    block.append(copyBtn);
  });
  const clipboard = new ClipboardJS('.copy-btn', {
    target: function(trigger) {
        return trigger.previousElementSibling;
    }
	});
	clipboard.on('success', function(e) {
	    flashCopyMessage(e.trigger, 'Copied');
	    e.clearSelection();
	});
	clipboard.on('error', function(e) {
	    flashCopyMessage(e.trigger, 'Failed');
	});
});