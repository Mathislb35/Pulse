# 🎟️ Pulse

**Pulse** est une application web événementielle à dimension communautaire, basée sur une **API REST**.  
Elle a pour objectif de simplifier l’organisation et la participation aux événements pour les particuliers, en centralisant services, interactions et logistique au sein d’une seule plateforme.

---

## 📌 Problématique

> Comment simplifier la gestion d’un événement pour les particuliers tout en améliorant l’expérience communautaire des participants ?

---

## 🎯 Objectifs

- Centraliser les services liés aux événements
- Faciliter les échanges entre participants
- Réduire les frictions logistiques (transport, organisation)
- Proposer une architecture claire, évolutive et scalable

---

## 🚀 Fonctionnalités

### MVP (Minimum Viable Product)
- Authentification des utilisateurs
- Création et consultation d’événements
- Participation à un événement
- Wishlist (voir qui participe au même événement)
- Covoiturage lié à un événement
- Messagerie de groupe par événement

### Fonctionnalités à venir (V2+)
- Billetterie et revente de billets
- Cashless (paiement dématérialisé)
- Playlist de découverte d’événements
- Mise en avant / boost d’événements
- Recommandations basées sur la géolocalisation et les goûts musicaux

---

## 🏗️ Architecture

```
[ Frontend Web ] 
      ↓ REST 
[ API Backend ] 
      ↓ 
[ Base de données ] 
```

- Communication via JSON
- API versionnée (`/api/v1`)
- Authentification par JWT


---

## 🔌 API REST

### Authentification
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Événements
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/{id}`
- `PUT /api/events/{id}`
- `DELETE /api/events/{id}`

### Participation / Wishlist
- `POST /api/events/{id}/join`
- `DELETE /api/events/{id}/leave`
- `GET /api/events/{id}/participants`

### Covoiturage
- `POST /api/events/{id}/rides`
- `GET /api/events/{id}/rides`
- `POST /api/rides/{id}/join`

### Messagerie
- `GET /api/events/{id}/messages`
- `POST /api/events/{id}/messages`

---

## 🗄️ Modèle de données (simplifié)

- `users`
- `events`
- `event_participants`
- `rides`
- `messages`

---

## 🛠️ Stack technique

### Backend
- API REST (Laravel / FastAPI / Node.js)
- JWT pour l’authentification
- Documentation OpenAPI (Swagger)

### Frontend
- SPA (React / Vue.js)

---

## 📈 Roadmap

- [ ] Conception du modèle de données
- [ ] Implémentation de l’API REST
- [ ] Tests API
- [ ] Développement frontend
- [ ] Fonctionnalités avancées

---

## 👤 Auteurs

**Mathis Lebreton-Béchu**, **Maël Souvestre**
Bachelor développeur web

---

## 📄 Licence

Projet pédagogique — licence à définir.


