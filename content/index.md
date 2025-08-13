---
layout: layout.njk
title: My Brain
---

<ul>
{% for note in collections.notes %}
  <li>
    <a href="{{ note.url }}">{{ note.data.title }}</a>
    — {{ note.date | date("yyyy-LL-dd") }}
  </li>
{% endfor %}
</ul>
