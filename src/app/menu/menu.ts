import { CoreMenu } from '@core/types'

// Créer le menu principal
export const menu: CoreMenu[] = [
  // Créer le menu Accueil
  {
    id: 'accueil',
    title: 'Accueil',
    type: 'item',
    icon: 'home',
    url: '/pages/monEspace'
  },
  // Créer le menu SI-RH
  {
    id: 'SI-RH',
    title: 'SI-RH',
    type: 'collapsible',
    icon: 'users',
    children: [
      {
        id: 'Candidats',
        title: 'Candidats',
        type: 'item',
        icon: 'user',
        url: '/pages/candidat/lister'
      },
      {
        id: 'Collaborateurs',
        title: 'Collaborateurs',
        type: 'item',
        icon: 'user-check',
        url: '/pages/collaborateur/lister'
      },
      {
        id: 'NotesDeFrais',
        title: 'Notes de Frais',
        type: 'item',
        icon: 'file-text',
        url: '/pages/parameters/utilisateur'
      },
      {
        id: 'Absences',
        title: 'Absences',
        type: 'item',
        icon: 'user',
        url: '/pages/parameters/candidat'
      }
    ]
  },
  {
    // Créer le menu SI-CO
    id: 'SI-CO',
    type: 'collapsible',
    title: 'SI-CO',
    icon: 'shopping-cart',
    children: [
      {
        id: 'Société',
        title: 'Société',
        type: 'item',
        icon: 'info',
        url: '/pages/societe/lister'
      },
      {
        id: 'Sites',
        title: 'Sites',
        type: 'item',
        icon: 'flag',
        url: '/pages/site/lister'
      },
      {
        id: 'Opportunitées',
        title: 'Opportunitées',
        type: 'item',
        icon: 'trending-up',
        url: '/pages/opportunitees/lister'
      },
      {
        id: 'Affaires',
        title: 'Affaires',
        type: 'item',
        icon: 'list',
        url: '/pages/affaires/lister'
      }
    ]    
  }
  ,
  {
    // Créer le menu SI-PR
    id: 'SI-PR',
    type: 'collapsible',
    title: 'SI-PR',
    icon: 'database',
    children: [
      {
        id: 'deploiement',
        title: 'Affaires',
        type: 'item',
        icon: 'list',
        url: '/pages/affaire'
      },
      {
        id: 'usine',
        title: 'RAM',
        type: 'item',
        icon: 'file',
        url: '/pages/ram'
      }
    ]    
  }  ,
  {
    // Créer le menu déroulant
    id: 'parameters',
    type: 'collapsible',
    title: 'SI-FI',
    icon: 'dollar-sign',
    children: [
      {
        id: 'deploiement',
        title: 'Factures',
        type: 'item',
        icon: 'file',
        url: '/pages/factures'
      },
      {
        id: 'usine',
        title: 'Suivi',
        type: 'item',
        icon: 'activity',
        url: '/pages/suivi'
      }
    ]    
  }
]
