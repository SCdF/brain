---
layout: layout.njk
title: Thoughts
---

<ul>
{% for note in collections.notes %}
  <li>
    <a href="{{ note.url }}">{{ note.data.title }}</a>
    — {{ note.date | dateFormat }}
  </li>
{% endfor %}
</ul>
