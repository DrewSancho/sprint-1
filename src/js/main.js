(function () {
    var name = document.querySelector('.name');
    var qty = document.querySelector('.qty');
    var add = document.querySelector('.add');
    var addToCart = document.querySelector('.add-to-cart');
    var submit = addToCart.querySelector('.submit');
    var listButtons = document.querySelector('.subheader');
    var needEl = document.querySelector('.list-items');
    var inCartEl = document.querySelector('.in-cart-list');
    var lists = Array.prototype.slice.call(document.querySelector('.list-container').children);
    var need = [
        {
            name: 'Breyers Cookies and Cream',
            qty: 1
        },
        {
            name: 'Tide',
            qty: 2
        },
        {
            name: 'Paper Towels',
            qty: 1
        },
        {
            name: 'Yogurt',
            qty: 20
        }
    ];

    var inCart = [];
    // appends item class and error message to the validator
    function error (item, message) {
        item.parentElement.classList.add('is-invalid');
        item.parentElement.setAttribute('data-msg', message);
    }
    // validate the quantity and the item input
    function validator () {
        var willSubmit = true;

        if (!name.value) {
            // add class is-invalid and data-msg
            error(name, 'Must have a valid Item name');
            willSubmit = false;
        }

        return willSubmit;
    }

    // switch between lists on cellular level
    function listEvents () {
        listButtons.addEventListener('click', function (e) {
            var target;
            if (e.target.matches('.listHeader')) {
                target = '.' + e.target.dataset.list;
                lists.forEach(function (x) {
                    x.classList.remove('is-active');
                });
                document.querySelector(target).classList.add('is-active');
            }
        });
    }

    // create new list items in the lists
    function renderNeed (items) {
        needEl.innerHTML = '';
        var newItem;
        for (var i = 0; i < items.length; i++) {
            newItem = buildListItem(items[i]);
            needEl.appendChild(newItem);
        };
    }

    // copies the item into the cart list
    function renderInCart (items) {
        inCartEl.innerHTML = '';
        var newItem;
        for (var i = 0; i < items.length; i++) {
            newItem = getListItemEl(items[i]);
            inCartEl.appendChild(newItem);
        };
    }

    function getListItemEl (item) {
        var el = document.createElement('li');
        el.innerHTML = item.name + ' ' + '<span class="span"> Quantity: ' + item.qty + ' </span>';
        return el;
    }

    function buildListItem (item) {
        var el = document.createElement('li');
        el.addEventListener('click', function (e) {
            if (e.target.matches('.chk:not([disabled])')) {
                e.target.setAttribute('disabled', '');
                inCart.push(item);
                renderInCart(inCart);
            }
        });
        el.innerHTML = item.name + ' ' + '<span class="span"> Quantity: ' + item.qty + ' </span>' + ' ' + '<input type="checkbox" class="chk">';
        return el;
    }

    submit.addEventListener('click', function () {
        name.parentElement.classList.remove('is-invalid');
        qty.parentElement.classList.remove('is-invalid');
        if (validator()) {
            need.push({
                qty: parseInt(qty.value) || 1,
                name: name.value
            });

            renderNeed(need);

            qty.value = '';
            name.value = '';
        }
    });

    // add.addEventListener('click', function () {

    // });

    listEvents();
    renderNeed(need);
})();