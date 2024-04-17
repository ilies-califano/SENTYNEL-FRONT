// Exporter la classe Ajouterutilisateur
export class Ajouterutilisateur{

  // Créer un constructeur
  constructor(
    
      // Définir le nom
       public fullName: string,

      // Définir l'email
      public email: string,

      // Définir le mot de passe
      public password: string,

      // Définir l'identifiant 
      public id?: string,
  ){}
}