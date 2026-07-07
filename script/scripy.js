//index.html//
  document.querySelectorAll('.bookmark-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); btn.classList.toggle('saved'); });
  });

  (function() {
    if (window.__menuToggleBound) return;
    window.__menuToggleBound = true;
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    function toggleNav(e) {
      e.preventDefault();
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    toggle.addEventListener('click', toggleNav);
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  })();

  (function() {
    var searchInput = document.getElementById('homeSearchInput');
    var searchBtn = document.getElementById('homeSearchBtn');
    var pillsWrap = document.getElementById('homePills');

    function goToEvents(params) {
      var query = new URLSearchParams(params);
      var qs = query.toString();
      window.location.href = 'events.html' + (qs ? '?' + qs : '');
    }

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', function() {
        var term = searchInput.value.trim();
        goToEvents(term ? { q: term } : {});
      });
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var term = searchInput.value.trim();
          goToEvents(term ? { q: term } : {});
        }
      });
    }

    if (pillsWrap) {
      pillsWrap.querySelectorAll('button').forEach(function(pill) {
        pill.addEventListener('click', function() {
          var filter = pill.getAttribute('data-filter') || 'all';
          goToEvents(filter === 'all' ? {} : { category: filter });
        });
      });
    }
  })();
//event.html//

  document.querySelectorAll('.bookmark-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); btn.classList.toggle('saved'); });
  });

  

  (function() {
    var grid = document.getElementById('eventsGrid');
    var pillsWrap = document.getElementById('filterPills');
    var searchInput = document.getElementById('eventsSearchInput');
    var searchBtn = document.getElementById('eventsSearchBtn');
    var noResultsMsg = document.getElementById('noResultsMsg');
    if (!grid || !pillsWrap) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.event-card'));
    var pills = Array.prototype.slice.call(pillsWrap.querySelectorAll('button'));
    var currentFilter = 'all';

    function setActivePill(filter) {
      pills.forEach(function(p) {
        var active = p.getAttribute('data-filter') === filter;
        p.style.background = active ? 'var(--primary)' : 'white';
        p.style.color = active ? 'white' : 'var(--text-light)';
        p.style.borderColor = active ? 'var(--primary)' : '#e5e7eb';
      });
    }

    function applyFilters() {
      var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      var visibleCount = 0;
      cards.forEach(function(card) {
        var tagEl = card.querySelector('.card-tag');
        var category = tagEl ? tagEl.classList[1] : '';
        var title = (card.querySelector('h3') || {}).textContent || '';
        var desc = (card.querySelector('.card-desc') || {}).textContent || '';
        var haystack = (title + ' ' + desc + ' ' + (tagEl ? tagEl.textContent : '')).toLowerCase();

        var matchesCategory = currentFilter === 'all' || category === currentFilter;
        var matchesQuery = query === '' || haystack.indexOf(query) !== -1;
        var show = matchesCategory && matchesQuery;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (noResultsMsg) noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        currentFilter = pill.getAttribute('data-filter') || 'all';
        setActivePill(currentFilter);
        applyFilters();
      });
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', applyFilters);
    }
    if (searchInput) {
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); applyFilters(); }
      });
    }

    // Read query params coming from the homepage (e.g. events.html?category=tech&q=ai)
    var params = new URLSearchParams(window.location.search);
    var categoryParam = params.get('category');
    var queryParam = params.get('q');
    if (categoryParam && pills.some(function(p) { return p.getAttribute('data-filter') === categoryParam; })) {
      currentFilter = categoryParam;
    }
    if (queryParam && searchInput) {
      searchInput.value = queryParam;
    }
    setActivePill(currentFilter);
    applyFilters();
  })();
//create-event.html//

  document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = 'Creating...';
    setTimeout(function() {
      document.getElementById('successBanner').classList.add('visible');
      document.getElementById('eventForm').reset();
      btn.disabled = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> Create Event';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  });

  
//contact.html//

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = 'Sending...';
    setTimeout(function() {
      document.getElementById('successBanner').classList.add('visible');
      document.getElementById('contactForm').reset();
      btn.disabled = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' + ' Send Message';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  });

  
  //saved-events.html//

  document.querySelectorAll('.bookmark-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var card = btn.closest('.event-card');
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(function() {
        card.remove();
        var grid = document.getElementById('savedGrid');
        if (grid.children.length === 0) {
          grid.style.display = 'none';
          document.getElementById('emptyState').style.display = 'block';
        }
      }, 300);
    });
  });

  
//signin.html//

  document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'index.html';
  });

  
//signup.html//

  document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var pw = document.getElementById('password').value;
    var cpw = document.getElementById('confirmPassword').value;
    if (pw !== cpw) {
      alert('Passwords do not match!');
      return;
    }
    window.location.href = 'index.html';
  });

  
