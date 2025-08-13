---
layout: layout.njk
title: "My Brain"
---

# My Brain

<ul>
{% for note in collections.notes %}
  <li>
    <a href="{{ note.url }}">{{ note.data.title }}</a> – {{ note.date | date: "%Y-%m-%d" }}
  </li>
{% endfor %}
</ul>
