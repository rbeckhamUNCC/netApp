const list_items = document.querySelectorAll('.list-item');
const div_lists = document.querySelectorAll('.div_lists');

let currDraggedItem = null;

for (let i = 0; i < list_items.length; i++) {
  const list_item = list_items[i];

  list_item.addEventListener('dragstart', () => {
    currDraggedItem = list_item;
    setTimeout(() => {
      currDraggedItem.style.display = 'none';
    }, 0);
  })

  list_item.addEventListener('dragend', () => {
    setTimeout(() => {
      currDraggedItem.style.display = 'block';
      currDraggedItem = null;
    }, 0);
  })

  for (let j = 0; j < div_lists.length; j++) {
    const div_list = div_lists[j];

    div_list.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    div_list.addEventListener('dragenter', (e) => {
      e.preventDefault();
    });
    div_list.addEventListener('dragleave', (e) => {
      e.preventDefault();
    })
    div_list.addEventListener('drop', (e) => {
      e.preventDefault();
      e.target.append(currDraggedItem);
    })
  }
}
