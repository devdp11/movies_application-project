import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { error } from 'console';


export interface Movie {
  id: string;
  title: string;
  rating: string;
  release_year: string;
  genre: string;
  img: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  
  private watchLaterList: {id: string, title: string, rating:string, release_year: string, genre: string, img: string}[] = [];
  private storageInstance: Storage | null = null;
  readonly STORAGE_KEY = 'watchLaterList';
  
  constructor(private storage: Storage) {
    this.initStorage();
   }

   private async initStorage(){
      this.storageInstance = await this.storage.create();
      const storedList = await this.storageInstance.get(this.STORAGE_KEY);
      this.watchLaterList = storedList ? JSON.parse(storedList) : [];
   }
  // Esta função addWatchLaterList serve para adicionar o filme à storage depois de verificar se o filme ainda não existe no storage.
  addWatchLaterList(id: string, title: string, rating:string, release_year: string, genre: string, img: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const existingMovie = this.watchLaterList.find(movie => movie.id === id);
      if (existingMovie) {
        console.log('The movie is already in the watch later playlist');
        resolve();
      } else {
        this.watchLaterList.push({ id, title, rating, release_year, genre, img });
        this.saveData()
          .then(() => {
            console.log('Movie added to the watch later playlist | ', id);
            resolve();
          })
          .catch(error => {
            console.error('Error adding the movie to the list', error);
            resolve();
          });
      }
    });
  }
  // A função saveData serve para salvar o filme ao clicar no botão e ser verificado que ainda não existe nenhum no storage. Esta função é chamada pela função addWatchLaterList().
  private async saveData() {
    if (this.storageInstance) {
      await this.storageInstance.set(this.STORAGE_KEY, JSON.stringify(this.watchLaterList));
    }
  }
  // A função getPlaylistMovies() é chamada quando abrimos a pagina TAB3, para procurar se existem "StoredMovies" na storage. 
  async getPlaylistMovies(): Promise<{ id: string, title: string, rating:string, release_year: string, genre: string, img: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const StoredMovies = this.watchLaterList;
    console.log(StoredMovies);
    return StoredMovies;
  }
  //  Por ultimo, removeMoviesPlaylist() tem a função de remover o filme da storage na TAB3.
  async removeMoviesPlaylist(movie: Movie) {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const index = this.watchLaterList.findIndex(m => m.id === movie.id);
    if (index > -1) {
      this.watchLaterList.splice(index, 1);
      await this.saveData();
      console.log('Movie removed from playlist', movie);
    }
  }
  // Esta função para procurar ao clicar no botão "ver mais tarde" se o filme que clicamos ja existe no storage através do seu ID.
  checkIfMovieExists(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const existingMovie = this.watchLaterList.find(movie => movie.id === id);
      resolve(existingMovie !== undefined);
    });
  }

}