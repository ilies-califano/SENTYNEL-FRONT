// Créer l'interface Liste
export interface IListe {
    // Définir les colonnes
    colonnes: 
    [
        {
            // Définir la propriété
            propriete: string,

            // Définir le nom
            nom: string,

            // Définir la largeur
            largeur: number,

            // Définir l'affichage
            visible : boolean,

            // Définir l'affichage
            clef : boolean
        }
    ]

    // Définir les données
     donnees: any[]
}
