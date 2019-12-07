import { LogInterface } from './../models/login';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ItemInterface } from '../models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CiudadInterface } from '../models/ciudad';

type CollectionPredicate<T>= string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class DataItemService {

  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<ItemInterface>('item');
    this.items = this.itemCollection.valueChanges();
    this.ciudadCollection = afs.collection<CiudadInterface>('ciudades');
    this.ciudads = this.ciudadCollection.valueChanges();
    this.logCollection = afs.collection<LogInterface>('log');
    this.logs = this.logCollection.valueChanges();
  }

  private itemCollection: AngularFirestoreCollection<ItemInterface>;
  private items: Observable<ItemInterface[]>;
  private itemDoc: AngularFirestoreDocument<ItemInterface>;
  private item: Observable<ItemInterface>;
  public selectedItem: ItemInterface = {
    id: null,
    code: this.genCode()
  };

  private ciudadCollection: AngularFirestoreCollection<CiudadInterface>;
  private ciudads: Observable<CiudadInterface[]>;
  private ciudadDoc: AngularFirestoreDocument<CiudadInterface>;
  private ciudad: Observable<CiudadInterface>;
  public selectedCiudad: CiudadInterface = {
    id: null
  };

  private logCollection: AngularFirestoreCollection<LogInterface>;
  private logs: Observable<LogInterface[]>;
  private logDoc: AngularFirestoreDocument<LogInterface>;
  private log: Observable<LogInterface>;
  public selectedLog: LogInterface = {
    code: null
  };

  private col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection{
    return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
  }

  genCode() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = char.length;
    for (let i = 0; i < 6; i++) {
      result += char.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getAllCity() {
    return this.ciudads = this.ciudadCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CiudadInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getAllItem() {
    return this.items = this.itemCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ItemInterface;
          data.id = action.payload.doc.id;
          if (data.estado === '0') {
            data.estado = 'Enviado';
          } else if (data.estado === '1') {
            data.estado = 'En Transito';
          } else if (data.estado === '2') {
            data.estado = 'Entregado';
          }
          return data;
        });
      }));
  }

  getOneItem(idItem: string) {
    this.itemDoc = this.afs.doc<ItemInterface>(`item/${idItem}`);
    return this.item = this.itemDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ItemInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  getOneCity(idCity: string) {
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`sedes/${idCity}`);
    return this.ciudad = this.ciudadDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as CiudadInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  getOneLog<T>(ref: CollectionPredicate<T>, queryFn): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data();
          const id = d.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  addItem(item: ItemInterface): void {
    this.itemCollection.add(item);
  }

  addLog(log: LogInterface): void {
    this.logCollection.add(log);
  }

  addCity(city: CiudadInterface) {
    this.ciudadCollection.add(city);
  }

  updateItem(item: ItemInterface): void {
    const idItem = item.id;
    this.itemDoc = this.afs.doc<ItemInterface>(`item/${idItem}`);
    this.itemDoc.update(item);
  }

  updateCity(city: CiudadInterface): void {
    const idCiudad = city.id;
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudades/${idCiudad}`);
    this.ciudadDoc.update(city);
  }

  deleteItem(idItem: string): void {
    this.itemDoc = this.afs.doc<ItemInterface>(`item/${idItem}`);
    this.itemDoc.delete();
  }

  deleteCity(idCity: string): void {
    this.ciudadDoc = this.afs.doc<CiudadInterface>(`ciudades/${idCity}`);
    this.ciudadDoc.delete();
  }
}
